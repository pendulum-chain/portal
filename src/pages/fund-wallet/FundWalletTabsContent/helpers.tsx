import zenlinkIcon from '../../../assets/exchange/zenlink.svg';
import zenlinkDarkIcon from '../../../assets/exchange/zenlink-dark-mode.svg';
import hydrationIcon from '../../../assets/exchange/hydration.svg'
import { config } from '../../../config';

import { TenantName } from '../../../models/Tenant';
import { CardExternalLinkProps } from '../../../components/CardExternalLink';

import { FundWalletTab } from '..';

export type FundSupportedTenants = Exclude<TenantName, TenantName.Foucoco | TenantName.Local>;

const EXCHANGE_LIST: Record<FundSupportedTenants, { buy: CardExternalLinkProps[]; exchange: CardExternalLinkProps[] }> =
  {
    pendulum: {
      buy: [],
      exchange: [
        {
          title: 'Hydration',
          children: <img src={hydrationIcon} className="ml-6 w-40" />,
          href: 'https://app.hydration.net/trade/swap?assetIn=22&assetOut=1000081',
        },
      ],
    },
    amplitude: {
      buy: [],
      exchange: [
        {
          title: 'Zenlink',
          children: <img src={zenlinkDarkIcon} className="ml-6 w-40" />,
          href: 'https://app.zenlink.pro/swap',
        },
      ],
    },
  };

export function getExchangeList(tenantName: FundSupportedTenants, activeTab: FundWalletTab) {
  return EXCHANGE_LIST[tenantName][activeTab];
}

const BuyingTextMap: Record<FundSupportedTenants, string> = {
  [TenantName.Amplitude]: 'Currently no options available, try Exchange!',
  [TenantName.Pendulum]:
    'Purchase PEN through AlchemyPay, a payment system that enables users to easily buy cryptocurrencies using traditional payment methods such as credit cards, bank transfers, or mobile wallets.',
};

const ExchangeTextMap: Record<FundSupportedTenants, string> = {
  [TenantName.Amplitude]:
    'Before buying or trading AMPE, make sure to review the specific terms and conditions of each exchange.',
  [TenantName.Pendulum]:
    'Before buying or trading PEN, make sure to review the specific terms and conditions of each exchange.',
};

export function getActiveText(tenantName: FundSupportedTenants, activeTab: FundWalletTab) {
  return activeTab === FundWalletTab.Buy ? BuyingTextMap[tenantName] : ExchangeTextMap[tenantName];
}
