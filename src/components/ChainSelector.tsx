import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { AmplitudeLogo } from '../assets/AmplitudeLogo';
import { PendulumLogo } from '../assets/PendulumLogo';
import { toTitle } from '../helpers/string';
import useSwitchChain from '../hooks/useSwitchChain';
import { TenantName } from '../models/Tenant';

const options = [TenantName.Pendulum, TenantName.Amplitude, TenantName.Foucoco];

const ChainSelector = (): JSX.Element => {
  const { switchChain, currentTenant } = useSwitchChain();
  return (
    <details className="w-30 dropdown">
      <summary
        className="btn btn-ghost btn-sm flex h-auto min-h-[2.1rem] border-base-300 bg-base-200 px-2 text-sm sm:px-3"
        title={currentTenant}
      >
        {currentTenant === TenantName.Pendulum ? (
          <PendulumLogo className="mr-1 h-5 w-4" />
        ) : (
          <AmplitudeLogo className="mr-1 h-4 w-4" />
        )}
        <span className="mr-1 text-sm sm:mr-2">{currentTenant ? toTitle(currentTenant) : ''}</span>
        <ChevronDownIcon className="h-4 w-4" strokeWidth="2" />
      </summary>
      <ul className="menu dropdown-content z-[1] rounded-xl border border-base-300 bg-base-200 text-sm shadow-none">
        {options.map((option, i) => (
          <li key={i} onClick={() => switchChain(option)}>
            <a>
              {option === TenantName.Pendulum ? (
                <PendulumLogo light={currentTenant !== TenantName.Pendulum} className="mr-1 h-6 w-5" />
              ) : (
                <AmplitudeLogo className="mr-1 h-5 w-5" />
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
