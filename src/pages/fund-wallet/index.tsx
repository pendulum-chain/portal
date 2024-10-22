import { useState } from 'preact/compat';
import { Card } from 'react-daisyui';

import { FundWalletTabs } from './FundWalletTabs';
import { FundWalletTabsContent } from './FundWalletTabsContent';

import './styles.css';

export enum FundWalletTab {
  Buy = 'buy',
  Exchange = 'exchange',
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
        <FundWalletTabsContent activeTab={activeTab} />
      </Card>
    </div>
  );
}

export default FundWallet;
