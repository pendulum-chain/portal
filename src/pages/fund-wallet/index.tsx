import { useState } from 'react';
import { Card } from 'react-daisyui';

import { useGlobalState } from '../../GlobalStateProvider';
import { TenantName } from '../../models/Tenant';
import { config } from '../../config';

import { FundWalletTabs } from './FundWalletTabs';
import { FundWalletTabsContent } from './FundWalletTabsContent';
import './styles.css';

const CardContent = () => {
  const { tenantName } = useGlobalState();
  const [activeTab, setActiveTab] = useState(FundWalletTab.Exchange);

  if (tenantName === TenantName.Foucoco || tenantName === TenantName.Local)
    return (
      <a className="mt-8 btn btn-primary" href={config.faucetPage} rel="noopener noreferrer" target="_blank">
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
    <div className="flex justify-center mt-4">
      <Card bordered className="px-8 py-6 w-full max-w-xl tab-card shadow-0 bg-base-200">
        <Card.Title tag="h2" className="mb-5 text-3xl font-normal">
          Fund Wallet
        </Card.Title>
        <CardContent />
      </Card>
    </div>
  );
}

export default FundWallet;
