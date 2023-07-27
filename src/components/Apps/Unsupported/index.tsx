import { Button } from 'react-daisyui';
import { useLocation, useNavigate } from 'react-router-dom';
import { Apps } from '../../../config/apps';
import { builtTenantPath } from '../../../helpers/url';
import { TenantName } from '../../../models/Tenant';

export interface UnsupportedProps {
  app: Apps;
  tenant: TenantName;
  supportedTenants: TenantName[];
}

const Unsupported = ({ app, tenant, supportedTenants }: UnsupportedProps): JSX.Element | null => {
  const navigateTo = useNavigate();
  const location = useLocation().pathname;
  return (
    <div className="text-center py-8">
      <h2 className="text-xl mb-6">
        <span className="capitalize">{app}</span> is not supported on <span className="capitalize">{tenant}</span>.
        Switch to:
      </h2>
      <div className="flex justify-center items-center flex-wrap gap-3">
        {supportedTenants.map((st) => (
          <Button
            key={st}
            className="capitalize text-lg"
            variant="secondary"
            type="button"
            onClick={() => {
              navigateTo(builtTenantPath(tenant, st, location));
            }}
          >
            {st}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Unsupported;
