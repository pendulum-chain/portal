import { useState } from 'preact/compat';
import { Card } from 'react-daisyui';

import { useGlobalState } from '../../GlobalStateProvider';
import { TenantName } from '../../models/Tenant';
import { config } from '../../config';

import { FundWalletTabs } from './FundWalletTabs';
import { FundWalletTabsContent } from './FundWalletTabsContent';
import './styles.css';

const CardContent = () => {
  const { tenantName } = useGlobalState();
  const [activeTab, setActiveTab] = useState(FundWalletTab.Buy);

  if (tenantName === TenantName.Foucoco || tenantName === TenantName.Local)
    return (
      <a className="btn btn-secondary mt-8" href={config.faucetPage} rel="noopener noreferrer" target="_blank">
        Top up with Faucet
      </a>
    );

  return (
    <>
      <FundWalletTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <FundWalletTabsContent activeTab={activeTab} tenantName={tenantName} />
    </>
  );
};

export enum FundWalletTab {
  Buy = 'buy',
  Exchange = 'exchange',
}

function FundWallet() {
  return (
    <div className="mt-4 flex justify-center">
      <Card bordered className="tab-card shadow-0 w-full max-w-xl bg-base-200 px-8 py-6">
        <Card.Title tag="h2" className="text-3xl font-normal">
          Fund Wallet
        </Card.Title>
        <CardContent />
      </Card>
    </div>
  );
}

export default FundWallet;
