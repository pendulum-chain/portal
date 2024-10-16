import { Card, Tabs } from 'react-daisyui';
import { useState } from 'preact/hooks';
import { TenantName } from '../../models/Tenant';
import { useGlobalState } from '../../GlobalStateProvider';
import { useMemo } from 'preact/compat';

enum FundWalletTabs {
  Buy = 0,
  Exchange = 1,
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
    </div>
  );
}

function FundWallet() {
  const [tabValue, setTabValue] = useState(FundWalletTabs.Buy);
  const { tenantName } = useGlobalState();

  const getTabProps = (index: number) => ({
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
            <Tabs.Tab className={tabClassName} {...getTabProps(0)}>
              Buy
            </Tabs.Tab>
            <Tabs.Tab className={tabClassName} {...getTabProps(1)}>
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
