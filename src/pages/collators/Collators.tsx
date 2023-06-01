import CollatorsTable from './CollatorsTable';
import CollatorRewards from './CollatorRewards';

function Collators() {
  return (
    <div className="overflow-x-auto collators-list-container">
      <CollatorRewards />
      <CollatorsTable />
    </div>
  );
}

export default Collators;
