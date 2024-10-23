import { useGlobalState } from '../../../GlobalStateProvider';
import { TenantName } from '../../../models/Tenant';
import { CardExternalLink } from '../../../components/CardExternalLink';

import { FundWalletTab } from '..';
import { getActiveText, getExchangeList } from './helpers';
import { config } from '../../../config';

interface FundWalletTabsContentProps {
  activeTab: FundWalletTab;
}

export function FundWalletTabsContent({ activeTab }: FundWalletTabsContentProps) {
  const { tenantName } = useGlobalState();

  if (tenantName === TenantName.Foucoco || tenantName === TenantName.Local)
    return (
      <a className="btn btn-secondary mt-8" href={config.faucetPage} rel="noopener noreferrer" target="_blank">
        Top up with Faucet
      </a>
    );

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
