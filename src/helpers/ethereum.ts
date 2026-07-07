import { keccakAsHex } from '@polkadot/util-crypto';

/** Basic shape check: 0x + 40 hex chars. */
export function isHexAddressFormat(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

/** EIP-55 checksummed form of an address. */
export function toChecksumAddress(address: string): string {
  const lower = address.toLowerCase().replace(/^0x/, '');
  // keccak of the ASCII lowercase hex string (EIP-55); the missing 0x prefix
  // makes keccakAsHex treat the input as a plain string, which is intended.
  const hash = keccakAsHex(lower, 256).slice(2);
  let checksummed = '0x';
  for (let i = 0; i < lower.length; i++) {
    checksummed += parseInt(hash[i], 16) >= 8 ? lower[i].toUpperCase() : lower[i];
  }
  return checksummed;
}

/**
 * Valid destination address for the migration. The zero address is rejected
 * (the vault refuses it, so the burn could never be released); mixed-case
 * addresses must have a correct EIP-55 checksum; single-case addresses carry
 * no checksum information and are accepted as-is.
 */
export function isValidEip55Address(address: string): boolean {
  if (!isHexAddressFormat(address)) return false;
  if (/^0x0{40}$/.test(address)) return false;
  const body = address.slice(2);
  const isMixedCase = /[A-F]/.test(body) && /[a-f]/.test(body);
  return isMixedCase ? toChecksumAddress(address) === address : true;
}

async function rpc(baseRpcUrl: string, method: string, params: unknown[]): Promise<string> {
  const response = await fetch(baseRpcUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  const json = (await response.json()) as { result?: string; error?: { message: string } };
  if (json.error || json.result === undefined) {
    throw new Error(`Base RPC ${method} failed: ${json.error?.message ?? 'no result'}`);
  }
  return json.result;
}

function to32ByteWord(value: bigint): string {
  return value.toString(16).padStart(64, '0');
}

function addressWord(address: string): string {
  return address.toLowerCase().replace(/^0x/, '').padStart(64, '0');
}

// Function selectors of the MigrationVault (see contracts/src/MigrationVault.sol
// in the pendulum repo); computed with `cast sig`.
const SELECTOR_NONCE_CONSUMED = '0xe406947e'; // nonceConsumed(uint64)
const SELECTOR_ACTIVE_APPROVALS = '0xab3894a7'; // activeApprovals(bytes32)
const SELECTOR_THRESHOLD = '0x42cde4e8'; // threshold()

/** keccak256(abi.encode(uint64 nonce, address recipient, uint256 palletAmount)) */
export function migrationPayloadHash(nonce: bigint, recipient: string, palletAmount: bigint): string {
  const encoded = `0x${to32ByteWord(nonce)}${addressWord(recipient)}${to32ByteWord(palletAmount)}`;
  return keccakAsHex(encoded, 256);
}

export async function isNonceConsumed(baseRpcUrl: string, vault: string, nonce: bigint): Promise<boolean> {
  const result = await rpc(baseRpcUrl, 'eth_call', [
    { to: vault, data: `${SELECTOR_NONCE_CONSUMED}${to32ByteWord(nonce)}` },
    'latest',
  ]);
  return BigInt(result) === 1n;
}

export async function getActiveApprovals(baseRpcUrl: string, vault: string, payloadHash: string): Promise<number> {
  const result = await rpc(baseRpcUrl, 'eth_call', [
    { to: vault, data: `${SELECTOR_ACTIVE_APPROVALS}${payloadHash.replace(/^0x/, '')}` },
    'latest',
  ]);
  return Number(BigInt(result));
}

export async function getApprovalThreshold(baseRpcUrl: string, vault: string): Promise<number> {
  const result = await rpc(baseRpcUrl, 'eth_call', [{ to: vault, data: SELECTOR_THRESHOLD }, 'latest']);
  return Number(BigInt(result));
}

/** True when the address has deployed code on Base (a smart contract). */
export async function isContractOnBase(baseRpcUrl: string, address: string): Promise<boolean> {
  const code = await rpc(baseRpcUrl, 'eth_getCode', [address, 'latest']);
  return code !== '0x' && code !== '0x0';
}
