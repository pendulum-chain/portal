import { CardExternalLink } from '../../../components/CardExternalLink';

import { FundWalletTab } from '..';
import { getActiveText, getExchangeList, FundSupportedTenants } from './helpers';

interface FundWalletTabsContentProps {
  activeTab: FundWalletTab;
  tenantName: FundSupportedTenants;
}

export function FundWalletTabsContent({ activeTab, tenantName }: FundWalletTabsContentProps) {
  const activeText = getActiveText(tenantName, activeTab);
  const exchangeList = getExchangeList(tenantName, activeTab);

  return (
    <div className="my-4 text-sm text-secondary-content">
      {activeText}
      <div className="mt-4">
        {exchangeList.map(({ title, href, children }) => (
          <CardExternalLink key={title} title={title} href={href}>
            {children}
          </CardExternalLink>
        ))}
      </div>
    </div>
  );
}
