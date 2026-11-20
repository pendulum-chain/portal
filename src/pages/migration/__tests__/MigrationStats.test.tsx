import { render, screen } from '@testing-library/react';
import { MigrationStats as Stats } from '../../../hooks/migration/useMigrationStats';
import { MigrationStats } from '../MigrationStats';

const PEN = 10n ** 18n;
let mockResult: { data?: Stats; isError: boolean } = { isError: false };
jest.mock('../../../hooks/migration/useMigrationStats', () => ({ useMigrationStats: () => mockResult }));

const target = {
  baseRpcUrl: 'https://rpc',
  vaultAddress: '0x8A02A4BDd2536F85Af39Cc86Ef43f55bc69b9b2b',
  baseChainId: '0x2105',
  baseExplorerUrl: 'https://basescan.org',
};
const stats: Stats = {
  onPendulum: 149_933_029n * PEN,
  onBase: 200n * PEN,
  inFlight: 0n,
  treasuryOnPendulum: 33_532_116n * PEN,
  treasuryOnBase: 100n * PEN,
  migrations: 2,
  pendulumPaused: false,
  basePaused: false,
  pendulumBlock: 8_037_637,
  baseBlock: 59_860_400n,
  tokenAddress: '0x0fc4a6ff1cdae34e1a481e4da38d402de0733955',
  treasuryAddress: '0x74f00d5ff15f0d2526792e5939e3bc45d445ce04',
};

describe('MigrationStats', () => {
  it('shows the totals of both chains and the treasury split', () => {
    mockResult = { data: stats, isError: false };
    render(<MigrationStats target={target} tokenSymbol="PEN" />);
    expect(screen.getByText('Open')).toBeTruthy();
    expect(screen.getByText('149,933,029 PEN')).toBeTruthy();
    expect(screen.getAllByText('200 PEN')).toHaveLength(2);
    expect(screen.getByText('33,532,216 PEN')).toBeTruthy();
    expect(screen.getByText('33,532,116 on Pendulum, 100 on Base')).toBeTruthy();
    expect(screen.getByText(/0\.00013 % of all PEN/)).toBeTruthy();
    expect(screen.getByText(/Migrations so far: 2/)).toBeTruthy();
    expect(screen.getByText(/Pendulum block 8,037,637 \(finalized\) and Base block 59,860,400/)).toBeTruthy();
  });

  it('links the token, the vault and the treasury on Base, checksummed', () => {
    mockResult = { data: stats, isError: false };
    render(<MigrationStats target={target} tokenSymbol="PEN" />);
    const href = (name: string) => screen.getByText(name).closest('a')?.getAttribute('href');
    expect(href('0x0FC4A6FF1cDae34E1A481e4Da38D402dE0733955')).toBe(
      'https://basescan.org/token/0x0FC4A6FF1cDae34E1A481e4Da38D402dE0733955',
    );
    expect(href('0x8A02A4BDd2536F85Af39Cc86Ef43f55bc69b9b2b')).toBe(
      'https://basescan.org/address/0x8A02A4BDd2536F85Af39Cc86Ef43f55bc69b9b2b',
    );
    expect(href('0x74F00d5ff15f0d2526792E5939e3bC45D445Ce04')).toBe(
      'https://basescan.org/address/0x74F00d5ff15f0d2526792E5939e3bC45D445Ce04',
    );
  });

  it('leaves out the links it has no address for', () => {
    mockResult = {
      data: { ...stats, tokenAddress: '0x0000000000000000000000000000000000000000', treasuryAddress: undefined },
      isError: false,
    };
    render(<MigrationStats target={target} tokenSymbol="PEN" />);
    expect(screen.queryByText(/PEN token:/)).toBeNull();
    expect(screen.queryByText(/Treasury \(governance timelock\)/)).toBeNull();
    expect(screen.getByText(/Migration vault:/)).toBeTruthy();
  });

  it('shows the exact amount on hover', () => {
    mockResult = { data: { ...stats, onBase: 200n * PEN + 5n * 10n ** 17n }, isError: false };
    render(<MigrationStats target={target} tokenSymbol="PEN" />);
    expect(screen.getAllByTitle('200.5 PEN').length).toBeGreaterThan(0);
  });

  it('names a pause on either chain', () => {
    mockResult = { data: { ...stats, basePaused: true }, isError: false };
    render(<MigrationStats target={target} tokenSymbol="PEN" />);
    expect(screen.getByText('Releases paused on Base')).toBeTruthy();
  });

  it('says so when the figures cannot be read', () => {
    mockResult = { isError: true };
    render(<MigrationStats target={target} tokenSymbol="PEN" />);
    expect(screen.getByText(/could not be read/)).toBeTruthy();
  });
});
