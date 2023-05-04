import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Button, Dropdown } from 'react-daisyui';
import AmplitudeLogo from '../assets/AmplitudeLogo';
import PendulumLogo from '../assets/PendulumLogo';
import { useGlobalState } from '../GlobalStateProvider';
import { TenantName } from '../models/Tenant';
import { useNavigate, useLocation } from 'react-router-dom';
import path from 'path';

const options = [TenantName.Pendulum, TenantName.Amplitude, TenantName.Foucoco];

const ChainSelector = ({ tenantName }: { tenantName: TenantName | undefined }): JSX.Element => {
  const navigateTo = useNavigate();
  const location = useLocation().pathname;
  return (
    <>
      <Dropdown vertical="end" className="w-30">
        <Button size="sm" color="ghost" className="text-sm border-base-300 bg-base-200 h-9" title={tenantName}>
          {tenantName === TenantName.Pendulum ? (
            <PendulumLogo className="w-5 h-6 mr-1" />
          ) : (
            <AmplitudeLogo className="w-5 h-5 mr-1" />
          )}
          <span className="text-sm mr-5">{tenantName ? toTitle(tenantName) : ''}</span>
          <ChevronDownIcon className="w-3 h-3" stroke-width="2" />
        </Button>
        <Dropdown.Menu className="w-30 mt-1.5 p-1 text-sm border-base-300 border bg-base-200 rounded-xl shadow-none">
          {options.map((option) => (
            <Dropdown.Item
              onClick={() => {
                navigateTo(buildPath(tenantName, option, location));
              }}
            >
              {option === TenantName.Pendulum ? (
                <PendulumLogo className="w-5 h-6 mr-1" />
              ) : (
                <AmplitudeLogo className="w-5 h-5 mr-1" />
              )}
              <span className="text-sm mr-3">{toTitle(option)}</span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

function buildPath(current: TenantName | undefined, next: TenantName, location: string) {
  return current ? location.replace(current, next) : location;
}

function toTitle(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default ChainSelector;
