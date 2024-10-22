import { useState, useEffect } from 'preact/compat';
import { Card } from 'react-daisyui';

import { TenantName } from '../../models/Tenant';
import { useGlobalState } from '../../GlobalStateProvider';
import banxaIcon from '../../assets/exchange/banxa-gradient.png';
import mexcIcon from '../../assets/exchange/mexc.svg';
import zenlinkIcon from '../../assets/exchange/zenlink.svg';
import zenlinkDarkIcon from '../../assets/exchange/zenlink-dark-mode.svg';
import stellaswapIcon from '../../assets/exchange/stellaswap.svg';
import alchemyPayIcon from '../../assets/alchemypay.svg';
import { ExternalIcon } from '../../assets/ExternalIcon';
import { config } from '../../config';
import { FundWalletTabs } from './FundWalletTabs';
import './styles.css';

type CardDetail = Omit<ContentCardProps, 'tenantName'>;
type FundSupportedTenants = Exclude<TenantName, TenantName.Foucoco | TenantName.Local>;

const CARD_DATA: Record<FundSupportedTenants, { buy: CardDetail[]; exchange: CardDetail[] }> = {
  pendulum: {
    buy: [
      {
        title: 'AlchemyPay',
        image: <img src={alchemyPayIcon} className="ml-6 w-40" />,
        href: config.alchemyPay.encodeUrlWithRedirection(config.alchemyPay.prodUrl, window.location.href),
      },
    ],
    exchange: [
      {
        title: 'MEXC',
        image: <img src={mexcIcon} className="ml-6 w-40" />,
        href: 'https://www.mexc.com/exchange/PEN_USDT',
      },
      {
        title: 'StellaSwap',
        image: <img src={stellaswapIcon} className="ml-6 w-40" />,
        href: 'https://app.stellaswap.com/exchange/swap',
      },
      {
        title: 'Zenlink',
        image: <img src={zenlinkIcon} className="ml-6 w-40" />,
        href: 'https://app.zenlink.pro/swap',
      },
      {
        title: 'Banxa',
        image: <img src={banxaIcon} className="ml-2 w-40" />,
        href: 'https://checkout.banxa.com/',
      },
    ],
  },
  amplitude: {
    buy: [],
    exchange: [
      {
        title: 'Zenlink',
        image: <img src={zenlinkDarkIcon} className="ml-6 w-40" />,
        href: 'https://app.zenlink.pro/swap',
      },
    ],
  },
};

export enum FundWalletTab {
  Buy = 'buy',
  Exchange = 'exchange',
}

interface ContentCardProps {
  title: string;
  image: JSX.Element;
  href: string | Promise<string>;
  tenantName: TenantName;
}

function ContentCard({ image, href }: ContentCardProps) {
  const [finalHref, setFinalHref] = useState<string>('');

  useEffect(() => {
    if (typeof href === 'string') {
      setFinalHref(href);
    } else {
      href.then(setFinalHref);
    }
  }, [href]);

  return (
    <a href={finalHref} target="_blank" rel="noreferrer">
      <Card className="mt-2 flex h-20 flex-row items-center rounded-md bg-base-300/60 px-4 hover:opacity-70">
        {image}
        <ExternalIcon className="ml-auto mr-1 h-5 w-5 dark:fill-white" />,
      </Card>
    </a>
  );
}

interface ContentProps {
  activeTab: FundWalletTab;
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

function Content({ activeTab }: ContentProps) {
  const { tenantName } = useGlobalState();

  if (tenantName === TenantName.Foucoco || tenantName === TenantName.Local) return <></>;

  const BuyingText = BuyingTextMap[tenantName];
  const ExchangeText = ExchangeTextMap[tenantName];

  return (
    <div className="my-4 text-sm text-secondary-content">
      {activeTab === FundWalletTab.Buy ? BuyingText : ExchangeText}
      <div className="mt-4">
        {CARD_DATA[tenantName][activeTab].map((data, index) => (
          <ContentCard key={index} title={data.title} image={data.image} href={data.href} tenantName={tenantName} />
        ))}
      </div>
    </div>
  );
}

function FundWallet() {
  const [activeTab, setActiveTab] = useState(FundWalletTab.Buy);

  return (
    <div className="mt-4 flex justify-center">
      <Card bordered className="tab-card shadow-0 w-full max-w-xl bg-base-200 px-8 py-6">
        <Card.Title tag="h2" className="text-3xl font-normal">
          Fund Wallet
        </Card.Title>
        <FundWalletTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <Content activeTab={activeTab} />
      </Card>
    </div>
  );
}

export default FundWallet;
