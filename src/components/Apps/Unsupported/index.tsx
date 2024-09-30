import {} from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Alert, AlertProps, Button } from 'react-daisyui';
import { Apps } from '../../../config/apps';
import useSwitchChain from '../../../hooks/useSwitchChain';
import { TenantName } from '../../../models/Tenant';

export interface UnsupportedProps {
  app: Apps;
  tenant: TenantName;
  supportedTenants: TenantName[];
}

const Unsupported = ({ app, tenant, supportedTenants }: UnsupportedProps): JSX.Element | null => {
  const { switchChain } = useSwitchChain();
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Alert
        icon={(<ExclamationTriangleIcon className="mr-2 h-8 w-8" />) as AlertProps['icon']}
        status="warning"
        className="mb-6 inline-block w-auto"
      >
        <div>
          <div className="mb-2 text-xl">
            <span className="capitalize">{app}</span> is not supported on <span className="capitalize">{tenant}</span>.
            Switch to one of the following:
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {supportedTenants.map((st) => (
              <Button
                key={st}
                variant="outline"
                size="sm"
                className="text-base capitalize"
                type="button"
                onClick={() => switchChain(st)}
              >
                {st}
              </Button>
            ))}
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default Unsupported;
