import { CollatorRewards } from './CollatorRewards/CollatorRewards';
import CollatorsTable from './CollatorsTable';
import './styles.css';

function Collators() {
  return (
    <div className="overflow-x-hidden xl:mx-40 lg:mx-10 collators-list-container">
      <CollatorRewards />
      <CollatorsTable />
    </div>
  );
}

export default Collators;
