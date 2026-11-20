import { render, screen } from '@testing-library/react';
import { MigrationStats as Stats } from '../../../hooks/migration/useMigrationStats';
import { MigrationStats } from '../MigrationStats';

const PEN = 10n ** 18n;
let mockResult: { data?: Stats; isError: boolean } = { isError: false };
jest.mock('../../../hooks/migration/useMigrationStats', () => ({ useMigrationStats: () => mockResult }));

const target = { baseRpcUrl: 'https://rpc', vaultAddress: '0x1', baseChainId: '0x2105', baseExplorerUrl: '' };
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
