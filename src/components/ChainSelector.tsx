import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { isDesktop } from 'react-device-detect';
import AmplitudeLogo from '../assets/AmplitudeLogo';
import PendulumLogo from '../assets/PendulumLogo';
import { toTitle } from '../helpers/string';
import useSwitchChain from '../hooks/useSwitchChain';
import { TenantName } from '../models/Tenant';

const options = [TenantName.Pendulum, TenantName.Amplitude, TenantName.Foucoco];

const ChainSelector = (): JSX.Element => {
  const { switchChain, currentTenant } = useSwitchChain();
  return (
    <details className="w-30 dropdown">
      <summary
        className="text-sm border-base-300 bg-base-200 min-h-[2.1rem] h-auto px-2 sm:px-3 btn btn-sm btn-ghost"
        title={currentTenant}
      >
        {currentTenant === TenantName.Pendulum ? (
          <PendulumLogo className="w-4 h-5 mr-1" />
        ) : (
          <AmplitudeLogo className="w-4 h-4 mr-1 " />
        )}
        {isDesktop ? <span className="mr-1 text-sm sm:mr-2">{currentTenant ? toTitle(currentTenant) : ''}</span> : <></>}
        <ChevronDownIcon className="w-4 h-4" stroke-width="2" />
      </summary>
      <ul className="text-sm border-base-300 border bg-base-200 rounded-xl shadow-none menu dropdown-content z-[1]">
        {options.map((option, i) => (
          <li key={i} onClick={() => switchChain(option)}>
            <a>
              {option === TenantName.Pendulum ? (
                <PendulumLogo light={currentTenant !== TenantName.Pendulum} className="w-5 h-6 mr-1" />
              ) : (
                <AmplitudeLogo className="w-5 h-5 mr-1" />
              )}
              <span className="mr-3 text-sm">{toTitle(option)}</span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default ChainSelector;
