import { useEffect, useMemo } from 'preact/compat';
import { Card, Tabs } from 'react-daisyui';
import { useState } from 'preact/hooks';
import { TenantName } from '../../models/Tenant';
import { useGlobalState } from '../../GlobalStateProvider';
import mexcIcon from '../../assets/exchange/mexc.svg';
import zenlinkIcon from '../../assets/exchange/zenlink.svg';
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
        image: <img src={alchemyPayIcon} className="h-full w-full" />,
        href: config.alchemyPay.encodeUrlWithRedirection(config.alchemyPay.prodUrl, window.location.href),
      },
    ],
    exchange: [
      {
        title: 'MEXC',
        image: <img src={mexcIcon} className="h-full w-full" />,
        href: 'https://www.mexc.com/exchange/PEN_USDT',
      },
      {
        title: 'StellaSwap',
        image: <img src={stellaswapIcon} className="h-full w-full" />,
        href: 'https://app.stellaswap.com/exchange/swap',
      },
      {
        title: 'Zenlink',
        image: <img src={zenlinkIcon} className="h-full w-full" />,
        href: 'https://app.zenlink.pro/swap',
      },
    ],
  },
  amplitude: {
    buy: [],
    exchange: [
      {
        title: 'Zenlink',
        image: <img src={zenlinkIcon} className="h-full w-full" />,
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
      <Card className="mt-2 flex flex-row items-center rounded-md bg-base-300/60 px-4 hover:opacity-70">
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
    <div className="mt-4 flex h-full items-center justify-center">
      <Card bordered className="tab-card shadow-0 w-full max-w-xl bg-base-200 px-8 py-6">
        <Card.Title tag="h2" className="text-3xl font-normal">
          Fund Wallet
        </Card.Title>
        <div className="mt-5 flex justify-between">
          <Tabs className="tabs-boxed flex flex-grow justify-center border border-neutral-500 bg-base-100 p-0 sm:w-5/6">
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
