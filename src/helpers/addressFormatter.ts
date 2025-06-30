import { Keyring } from '@polkadot/api';

export function getAddressForFormat(address: string, ss58Format: number | string = 0) {
  if (typeof ss58Format === 'string') {
    ss58Format = parseInt(ss58Format, 10);
  }

  const keyring = new Keyring();
  return keyring.encodeAddress(address, ss58Format);
}

export function getAddressKeyring(address: string, ss58Format: number | string = 0) {
  const keyring = new Keyring({ type: 'sr25519', ss58Format: Number(ss58Format) });
  return keyring.addFromAddress(address);
}

export function trimAddress(address: string, trimLength = 6): string {
  const addressLength = address.length;
  return `${address.slice(0, trimLength)}...${address.slice(addressLength - trimLength, addressLength)}`;
}
