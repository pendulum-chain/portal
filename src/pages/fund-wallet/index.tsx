import { Card, Tabs } from 'react-daisyui';
import { useState } from 'preact/hooks';
import { TenantName } from '../../models/Tenant';
import PendulumLogo from '../../assets/PendulumLogo';
import AmplitudeLogo from '../../assets/AmplitudeLogo';
import StellarLogo from '../../assets/StellarLogo';
import { useNodeInfoState } from '../../NodeInfoProvider';

enum FundWalletTabs {
  Buy = 0,
  Exchange = 1,
}

function FundWallet() {
  const [tabValue, setTabValue] = useState(FundWalletTabs.Buy);
  const { chain, tokenSymbol } = useNodeInfoState().state;

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
      </Card>
    </div>
  );
}

export default FundWallet;
