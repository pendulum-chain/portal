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

async function rpc<T = string>(baseRpcUrl: string, method: string, params: unknown[]): Promise<T> {
  const response = await fetch(baseRpcUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  const json = (await response.json()) as { result?: T; error?: { message: string } };
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
const SELECTOR_PER_RELEASE_CAP = '0x9937d635'; // perReleaseCap()
// keccak256("Released(uint64,address,uint256,uint256)"), emitted with the token transfer to the recipient.
const TOPIC_RELEASED = '0xba1208278d2bd6cfd1a8048239811d35ba512b87960a83e0c34dafefa650dd7b';

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

/**
 * The vault's per-release cap, in 18-decimal token (wei) units. A single
 * migration whose released amount exceeds this is accepted and burned on
 * Pendulum but its release on Base is deferred until governance raises the cap
 * — so the UI warns before submission and suggests splitting the amount.
 */
export async function getPerReleaseCap(baseRpcUrl: string, vault: string): Promise<bigint> {
  const result = await rpc(baseRpcUrl, 'eth_call', [{ to: vault, data: SELECTOR_PER_RELEASE_CAP }, 'latest']);
  return BigInt(result);
}

/**
 * True when `eth_getCode` output is contract code. An EIP-7702 delegation
 * designator (0xef0100 followed by the 20-byte delegate address) is not: it
 * marks a regular key-controlled account that delegated to a smart-account
 * implementation, and such an account holds and moves ERC-20 tokens normally.
 */
export function isContractCode(code: string): boolean {
  const normalized = code.toLowerCase();
  if (normalized === '0x' || normalized === '0x0') return false;
  return !/^0xef0100[0-9a-f]{40}$/.test(normalized);
}

/** True when the address has deployed contract code on Base. */
export async function isContractOnBase(baseRpcUrl: string, address: string): Promise<boolean> {
  return isContractCode(await rpc(baseRpcUrl, 'eth_getCode', [address, 'latest']));
}

/**
 * Hash of the transaction that released this migration on Base: the vault's
 * Released event for the nonce, emitted in the same transaction as the token
 * transfer to the recipient. Searches back from the latest block in windows
 * small enough for public RPC log limits (5 x 2,000 blocks, about 5.5 hours on
 * Base) and returns undefined if the release is older than that.
 */
export async function findReleaseTxHash(
  baseRpcUrl: string,
  vault: string,
  nonce: bigint,
  windows = 5,
  windowSize = 2_000n,
): Promise<string | undefined> {
  const latest = BigInt(await rpc(baseRpcUrl, 'eth_blockNumber', []));
  for (let i = 0n; i < BigInt(windows); i++) {
    const toBlock = latest - i * windowSize;
    if (toBlock < 0n) break;
    const fromBlock = toBlock - windowSize + 1n > 0n ? toBlock - windowSize + 1n : 0n;
    const logs = await rpc<{ transactionHash: string }[]>(baseRpcUrl, 'eth_getLogs', [
      {
        address: vault,
        topics: [TOPIC_RELEASED, `0x${to32ByteWord(nonce)}`],
        fromBlock: `0x${fromBlock.toString(16)}`,
        toBlock: `0x${toBlock.toString(16)}`,
      },
    ]);
    if (logs.length) return logs[0].transactionHash;
  }
  return undefined;
}
