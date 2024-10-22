import { useGlobalState } from '../../../GlobalStateProvider';
import { TenantName } from '../../../models/Tenant';
import { CardExternalLink } from '../../../components/CardExternalLink';

import { FundWalletTab } from '..';
import { getActiveText, getExchangeList } from './helpers';

interface FundWalletTabsContentProps {
  activeTab: FundWalletTab;
}

export function FundWalletTabsContent({ activeTab }: FundWalletTabsContentProps) {
  const { tenantName } = useGlobalState();

  if (tenantName === TenantName.Foucoco || tenantName === TenantName.Local) return <></>;

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
