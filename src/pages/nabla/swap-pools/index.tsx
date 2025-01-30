import SwapPools from '../../../components/nabla/Pools/Swap';
import { OldForexAmmNotice } from '../../../components/nabla/common/OldForexAmmNotice';

const SwapPoolsPage = (): JSX.Element | null => {
  return (
    <div id="swap-pools" className="mt-6">
      <OldForexAmmNotice />
      <SwapPools />
    </div>
  );
};
export default SwapPoolsPage;
