import { getMigrationValidationSchema } from '../ValidationSchema';

const VAULT = '0x1111111111111111111111111111111111111111';

function schema(vaultAddress = VAULT) {
  return getMigrationValidationSchema({
    transferable: 1000,
    total: 1000,
    minimumMigrationAmount: 100,
    existentialDeposit: 1,
    tokenSymbol: 'PEN',
    vaultAddress,
  });
}

async function baseAddressValid(value: string, vaultAddress = VAULT): Promise<boolean> {
  try {
    await schema(vaultAddress).validateAt('baseAddress', { baseAddress: value });
    return true;
  } catch {
    return false;
  }
}

describe('migration baseAddress validation', () => {
  it('accepts a normal Base wallet address', async () => {
    expect(await baseAddressValid('0x00000000000000000000000000000000deadbeef')).toBe(true);
  });

  it('rejects the migration vault address as a destination', async () => {
    // The round-6 defence-in-depth: burning towards the vault can never be
    // released, and it is the one address the pallet cannot reject on-chain.
    expect(await baseAddressValid(VAULT)).toBe(false);
  });

  it('rejects the vault address case-insensitively', async () => {
    const value = '0xabcdef0000000000000000000000000000000001'; // lower-case, passes eip55
    const vaultUpperCase = '0xABCDEF0000000000000000000000000000000001'; // same address, configured upper-case
    expect(await baseAddressValid(value, vaultUpperCase)).toBe(false);
  });

  it('still rejects the zero address', async () => {
    expect(await baseAddressValid('0x0000000000000000000000000000000000000000')).toBe(false);
  });

  it('does not apply the vault check when no vault address is configured', async () => {
    expect(await baseAddressValid('0x00000000000000000000000000000000deadbeef', '')).toBe(true);
  });
});
