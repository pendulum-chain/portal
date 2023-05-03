import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Button, Dropdown } from 'react-daisyui';
import AmplitudeLogo from '../assets/AmplitudeLogo';
import PendulumLogo from '../assets/PendulumLogo';
import { useGlobalState } from '../GlobalStateProvider';
import { TenantName } from '../models/Tenant';

const options = [
  { name: TenantName.Pendulum, url: `/${TenantName.Pendulum}/dashboard` },
  { name: TenantName.Amplitude, url: `/${TenantName.Amplitude}/dashboard` },
  { name: TenantName.Foucoco, url: `/${TenantName.Foucoco}/dashboard` },
];

const ChainSeletor = ({ tenantName }: { tenantName: TenantName | undefined }): JSX.Element => (
  <>
    <Dropdown vertical="end" dropdown-hover="">
      <Button
        size="sm"
        color="ghost"
        className="text-sm border-gray-300 border-base-300 border-1 bg-base-200 h-9"
        title={tenantName}
      >
        {tenantName === TenantName.Pendulum ? <PendulumLogo className="mr-1" /> : <AmplitudeLogo className="mr-1" />}
        <span className="text-sm mr-3">{tenantName ? toTitle(tenantName) : ''}</span>
        <ChevronDownIcon className="w-3 h-3" stroke-width="2" />
      </Button>
      <Dropdown.Menu className="w-40 p-1">
        {options.map((option) => (
          <Dropdown.Item
            onClick={() => {
              window.location.href = option.url;
            }}
          >
            {option.name === TenantName.Pendulum ? (
              <PendulumLogo className="mr-1" />
            ) : (
              <AmplitudeLogo className="mr-1" />
            )}
            <span className="text-sm mr-3">{toTitle(option.name)}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  </>
);

function toTitle(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default ChainSeletor;
