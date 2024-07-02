import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Button, Dropdown } from 'react-daisyui';
import AmplitudeLogo from '../assets/AmplitudeLogo';
import PendulumLogo from '../assets/PendulumLogo';
import { toTitle } from '../helpers/string';
import useSwitchChain from '../hooks/useSwitchChain';
import { TenantName } from '../models/Tenant';
import { isDesktop } from 'react-device-detect';

const options = [TenantName.Pendulum, TenantName.Amplitude, TenantName.Foucoco];

const ChainSelector = (): JSX.Element => {
  const { switchChain, currentTenant } = useSwitchChain();
  return (
    <Dropdown vertical="bottom" end className="w-30">
      <Button
        size="sm"
        color="ghost"
        className="text-sm border-base-300 bg-base-200 min-h-[2.1rem] h-auto px-2 sm:px-3"
        title={currentTenant}
      >
        {currentTenant === TenantName.Pendulum ? (
          <PendulumLogo className="w-4 h-5 mr-1" />
        ) : (
          <AmplitudeLogo className="w-4 h-4 mr-1 " />
        )}
        {isDesktop ? <span className="mr-1 text-sm sm:mr-2">{currentTenant ? toTitle(currentTenant) : ''}</span> : <></>}
        <ChevronDownIcon className="w-4 h-4" stroke-width="2" />
      </Button>
      <Dropdown.Menu className="w-30 mt-1.5 p-1 text-sm border-base-300 border bg-base-200 rounded-xl shadow-none">
        {options.map((option, i) => (
          <Dropdown.Item key={i} onClick={() => switchChain(option)}>
            {option === TenantName.Pendulum ? (
              <PendulumLogo light={currentTenant !== TenantName.Pendulum} className="w-5 h-6 mr-1" />
            ) : (
              <AmplitudeLogo className="w-5 h-5 mr-1" />
            )}
            <span className="mr-3 text-sm">{toTitle(option)}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChainSelector;
