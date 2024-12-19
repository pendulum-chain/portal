import banxaIcon from '../../../assets/exchange/banxa-gradient.png';
import mexcIcon from '../../../assets/exchange/mexc.svg';
import zenlinkIcon from '../../../assets/exchange/zenlink.svg';
import zenlinkDarkIcon from '../../../assets/exchange/zenlink-dark-mode.svg';
import stellaswapIcon from '../../../assets/exchange/stellaswap.svg';
import alchemyPayIcon from '../../../assets/alchemypay.svg';
import { config } from '../../../config';

import { TenantName } from '../../../models/Tenant';
import { CardExternalLinkProps } from '../../../components/CardExternalLink';

import { FundWalletTab } from '..';

export type FundSupportedTenants = Exclude<TenantName, TenantName.Foucoco | TenantName.Local>;

const EXCHANGE_LIST: Record<FundSupportedTenants, { buy: CardExternalLinkProps[]; exchange: CardExternalLinkProps[] }> =
  {
    pendulum: {
      buy: [
        {
          title: 'AlchemyPay',
          children: <img src={alchemyPayIcon} className="ml-6 w-40" />,
          href: config.alchemyPay.encodeUrlWithRedirection(config.alchemyPay.prodUrl, window.location.href),
        },
        {
          title: 'Banxa',
          children: <img src={banxaIcon} className="ml-2 w-40" />,
          href: 'https://checkout.banxa.com/?coinType=PEN&fiatType=EUR',
        },
      ],
      exchange: [
        {
          title: 'MEXC',
          children: <img src={mexcIcon} className="ml-6 w-40" />,
          href: 'https://www.mexc.com/exchange/PEN_USDT',
        },
        {
          title: 'StellaSwap',
          children: <img src={stellaswapIcon} className="ml-6 w-40" />,
          href: 'https://app.stellaswap.com/exchange/swap',
        },
        {
          title: 'Zenlink',
          children: <img src={zenlinkIcon} className="ml-6 w-40" />,
          href: 'https://app.zenlink.pro/swap',
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
