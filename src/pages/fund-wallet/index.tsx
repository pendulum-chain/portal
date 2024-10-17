import { Card, Tabs } from 'react-daisyui';
import { useState } from 'preact/hooks';
import { TenantName } from '../../models/Tenant';
import { useGlobalState } from '../../GlobalStateProvider';
import { FunctionComponent, useMemo } from 'preact/compat';

// import AlchemyPayLogo from '../../assets/alchemy-pay.png';
// import MexcLogo from '../../assets/mexc.png';
// import StellaSwapLogo from '../../assets/stellaswap.png';
import { MexcIcon } from '../../assets/mexc';
import { ZenlinkIcon } from '../../assets/zenlink';

interface CardDetail {
  title: string;
  image: FunctionComponent<{ className: string }>;
}

const CARD_DATA: Record<TenantName, { buy: CardDetail[]; exchange: CardDetail[] }> = {
  pendulum: {
    // buy: [{ title: 'AlchemyPay', image: AlchemyPayLogo }],
    buy: [],
    exchange: [
      { title: 'MEXC', image: MexcIcon },
      // { title: 'StellaSwap', image: StellaSwapLogo },
      { title: 'Zenlink', image: ZenlinkIcon },
    ],
  },
  amplitude: {
    buy: [],
    exchange: [{ title: 'Zenlink', image: ZenlinkIcon }],
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
  image: FunctionComponent<{ className: string }>;
}

function ContentCard(props: ContentCardProps) {
  const { title, image } = props;

  return (
    <Card className="flex flex-row items-center rounded-md bg-base-300/60 p-6">
      {image({ className: 'w-40 h-20' })}
      <div className="ml-2 text-2xl font-bold text-primary">{title}</div>
    </Card>
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
    <div className="my-6 text-sm text-secondary-content">
      {tabValue === FundWalletTabs.Buy ? BuyingText : ExchangeText}
      <div className="mt-4">
        {CARD_DATA[tenantName][tabValue].map((data, index) => (
          <ContentCard key={index} title={data.title} image={data.image} />
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

  const tabClassName = 'h-full w-full text-lg sm:text-md py-5';

  return (
    <div className="mt-4 flex h-full items-center justify-center">
      <Card bordered className="shadow-0 w-full max-w-xl bg-base-200 px-8 py-6">
        <Card.Title tag="h2" className="text-3xl font-normal">
          Fund Wallet
        </Card.Title>
        <div className="mt-5 flex justify-between">
          <Tabs className="tabs-boxed flex flex-grow justify-center border border-neutral-500 sm:w-5/6">
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
