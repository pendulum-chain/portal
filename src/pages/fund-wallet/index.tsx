import { Card, Tabs } from 'react-daisyui';
import { useState } from 'preact/hooks';
import { TenantName } from '../../models/Tenant';
import { useGlobalState } from '../../GlobalStateProvider';
import { useEffect, useMemo } from 'preact/compat';
import { MexcIcon } from '../../assets/mexc';
import { ZenlinkIcon } from '../../assets/zenlink';
import stellaswapIcon from '../../assets/exchange/stellaswap.svg';
import alchemyPayIcon from '../../assets/alchemypay.svg';
import externalIcon from '../../assets/ExternalIcon.svg';
import { config } from '../../config';
import './styles.css';

type CardDetail = Omit<ContentCardProps, 'tenantName'>;

const CARD_DATA: Record<TenantName, { buy: CardDetail[]; exchange: CardDetail[] }> = {
  pendulum: {
    buy: [
      {
        title: 'AlchemyPay',
        image: <img src={alchemyPayIcon} className="w-full h-full" />,
        href: config.alchemyPay.encodeUrlWithRedirection(config.alchemyPay.prodUrl, window.location.href),
      },
    ],
    exchange: [
      { title: 'MEXC', image: <MexcIcon className="w-full h-full" />, href: 'https://www.mexc.com/exchange/PEN_USDT' },
      {
        title: 'StellaSwap',
        image: <img src={stellaswapIcon} className="w-full h-full" />,
        href: 'https://app.stellaswap.com/exchange/swap',
      },
      { title: 'Zenlink', image: <ZenlinkIcon className="w-full h-full" />, href: 'https://app.zenlink.pro/swap' },
    ],
  },
  amplitude: {
    buy: [],
    exchange: [
      {
        title: 'Zenlink',
        image: <ZenlinkIcon className="w-full h-full" />,
        href: 'https://app.zenlink.pro/swap',
      },
    ],
  },
  foucoco: {
    buy: [],
    exchange: [],
  },
  local: {
    buy: [],
    exchange: [],
  },
};

enum FundWalletTabs {
  Buy = 'buy',
  Exchange = 'exchange',
}

interface ContentCardProps {
  title: string;
  image: JSX.Element;
  href: string | Promise<string>;
  tenantName: TenantName;
}

function ContentCard(props: ContentCardProps) {
  const { image } = props;

  const [finalHref, setFinalHref] = useState<string>('');
  useEffect(() => {
    if (typeof props.href === 'string') {
      setFinalHref(props.href);
    } else {
      props.href.then(setFinalHref);
    }
  }, [props.href]);

  const fill = props.tenantName === TenantName.Pendulum ? 'black' : 'white';

  return (
    <a href={finalHref} target="_blank" rel="noreferrer">
      <Card className="flex flex-row items-center px-4 mt-2 rounded-md bg-base-300/60 hover:opacity-70">
        <div className={`ml-6 h-20 w-40 fill-${fill}`}>{image}</div>
        <img src={externalIcon} className={`ml-auto mr-1 h-5 w-5 fill-${fill}`} />,
      </Card>
    </a>
  );
}

interface ContentProps {
  tabValue: FundWalletTabs;
  tenantName: TenantName;
}

function Content(props: ContentProps) {
  const { tabValue, tenantName } = props;

  const BuyingText = useMemo(() => {
    switch (tenantName) {
      case TenantName.Amplitude:
        return 'Currently no options available, try Exchange!';
      case TenantName.Pendulum:
        return 'Purchase PEN through AlchemyPay, a payment system that enables users to easily buy cryptocurrencies using traditional payment methods such as credit cards, bank transfers, or mobile wallets.';
      default:
        return '';
    }
  }, [tenantName]);

  const ExchangeText = useMemo(() => {
    switch (tenantName) {
      case TenantName.Amplitude:
        return 'Before buying or trading AMPE, make sure to review the specific terms and conditions of each exchange.';
      case TenantName.Pendulum:
        return 'Before buying or trading PEN, make sure to review the specific terms and conditions of each exchange.';
      default:
        return '';
    }
  }, [tenantName]);

  return (
    <div className="my-4 text-sm text-secondary-content">
      {tabValue === FundWalletTabs.Buy ? BuyingText : ExchangeText}
      <div className="mt-4">
        {CARD_DATA[tenantName][tabValue].map((data, index) => (
          <ContentCard key={index} title={data.title} image={data.image} href={data.href} tenantName={tenantName} />
        ))}
      </div>
    </div>
  );
}

function FundWallet() {
  const [tabValue, setTabValue] = useState(FundWalletTabs.Buy);
  const { tenantName } = useGlobalState();

  const getTabProps = (index: FundWalletTabs) => ({
    active: tabValue === index,
    onClick: () => setTabValue(index),
  });

  const tabClassName = 'h-full w-full text-lg sm:text-md text-primary font-bold py-5';

  return (
    <div className="flex items-center justify-center h-full mt-4">
      <Card bordered className="w-full max-w-xl px-8 py-6 tab-card shadow-0 bg-base-200">
        <Card.Title tag="h2" className="text-3xl font-normal">
          Fund Wallet
        </Card.Title>
        <div className="flex justify-between mt-5">
          <Tabs className="flex justify-center flex-grow p-0 border tabs-boxed border-neutral-500 bg-base-100 sm:w-5/6">
            <Tabs.Tab className={tabClassName} {...getTabProps(FundWalletTabs.Buy)}>
              Buy
            </Tabs.Tab>
            <Tabs.Tab className={tabClassName} {...getTabProps(FundWalletTabs.Exchange)}>
              Exchange
            </Tabs.Tab>
          </Tabs>
        </div>
        <Content tabValue={tabValue} tenantName={tenantName} />
      </Card>
    </div>
  );
}

export default FundWallet;
