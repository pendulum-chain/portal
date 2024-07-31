import '@testing-library/jest-dom';
import Big from 'big.js';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/preact';
import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import { useForm } from 'react-hook-form';

import { BlockchainAsset } from '../../../Selector/AssetSelector/helpers';
import { stringifyBigWithSignificantDecimals } from '../../../../shared/parseNumbers/metric';
import { USER_INPUT_MAX_DECIMALS } from '../../../../shared/parseNumbers/maxDecimals';
import { StandardFrom } from './StandardFrom';
import { FromProps } from '..';

jest.mock('../../../../shared/AssetIcons', () => ({
  getIcon: () => 'icon',
}));

const mockAsset: BlockchainAsset = {
  metadata: {
    decimals: 10,
    name: 'name',
    symbol: 'symbol',
    additional: { diaKeys: { blockchain: 'blockchain', symbol: 'symbol' } },
  },
  currencyId: { XCM: '1' } as unknown as SpacewalkPrimitivesCurrencyId,
};

const assets: BlockchainAsset[] = [mockAsset];

// Values that Javascript shows in exponential notation
const edgeCaseMaxBalances = [9e-7, 1e-7, 1e-10, 1e21, 1e22, 0.000000025164, 0.0000000025164];

const TestingComponent = ({ max }: { max: number }) => {
  const { setValue, register } = useForm();

  const defaultProps: FromProps = {
    formControl: {
      max: max,
      register: register('amount'),
      setValue: (n: string) => setValue('amount', n),
      error: '',
      maxDecimals: 12,
    },
    asset: {
      assets: assets,
      selectedAsset: assets[0],
      setSelectedAsset: jest.fn(),
      assetSuffix: 'USD',
    },
    description: {
      network: 'Network',
    },
    badges: {},
  };

  return <StandardFrom {...defaultProps} />;
};

describe('StandardFrom Component', () => {
  it.each(edgeCaseMaxBalances)(
    'Should set numbers with default exponential notation to be decimal notation',
    async (maxBalance) => {
      const { getByText, getByPlaceholderText } = render(<TestingComponent max={maxBalance} />);
      expect(getByText('From Network')).toBeInTheDocument();

      const maxButton = getByText('MAX');
      expect(maxButton).toBeInTheDocument();
      expect(getByText(`Available: ${stringifyBigWithSignificantDecimals(Big(maxBalance), 2)}`)).toBeInTheDocument();

      await userEvent.click(maxButton);

      const inputElement = getByPlaceholderText('0.0');
      expect(inputElement).toBeInTheDocument();

      expect(getByPlaceholderText('0.0')).toHaveValue(
        Big(maxBalance.toFixed(USER_INPUT_MAX_DECIMALS.PENDULUM)).toString(),
      );
    },
  );
});
