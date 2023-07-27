import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Button, Dropdown } from 'react-daisyui';
import { useLocation, useNavigate } from 'react-router-dom';
import AmplitudeLogo from '../assets/AmplitudeLogo';
import PendulumLogo from '../assets/PendulumLogo';
import { toTitle } from '../helpers/string';
import { builtTenantPath } from '../helpers/url';
import { TenantName } from '../models/Tenant';

const options = [TenantName.Pendulum, TenantName.Amplitude, TenantName.Foucoco];

const ChainSelector = ({ tenantName }: { tenantName: TenantName | undefined }): JSX.Element => {
  const navigateTo = useNavigate();
  const location = useLocation().pathname;
  return (
    <>
      <Dropdown vertical="end" className="w-30">
        <Button
          size="sm"
          color="ghost"
          className="text-sm border-base-300 bg-base-200 min-h-[2.1rem] h-auto px-2 sm:px-3"
          title={tenantName}
        >
          {tenantName === TenantName.Pendulum ? (
            <PendulumLogo className="w-4 h-5 mr-1" />
          ) : (
            <AmplitudeLogo className="w-4 h-4 mr-1 " />
          )}
          <span className="text-sm mr-1 sm:mr-2">{tenantName ? toTitle(tenantName) : ''}</span>
          <ChevronDownIcon className="w-4 h-4" stroke-width="2" />
        </Button>
        <Dropdown.Menu className="w-30 mt-1.5 p-1 text-sm border-base-300 border bg-base-200 rounded-xl shadow-none">
          {options.map((option, i) => (
            <Dropdown.Item
              key={i}
              onClick={() => {
                navigateTo(builtTenantPath(tenantName, option, location));
                window.location.reload();
              }}
            >
              {option === TenantName.Pendulum ? (
                <PendulumLogo light={tenantName !== TenantName.Pendulum} className="w-5 h-6 mr-1" />
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

export default ChainSelector;
