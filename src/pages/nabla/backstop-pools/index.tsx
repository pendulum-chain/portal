import BackstopPools from '../../../components/nabla/Pools/Backstop';
import { OldForexAmmNotice } from '../../../components/nabla/common/OldForexAmmNotice';

const BackstopPoolsPage = (): JSX.Element | null => {
  return (
    <div id="backstop-pools" className="center mt-6">
      <OldForexAmmNotice />
      <BackstopPools />
    </div>
  );
};
export default BackstopPoolsPage;
