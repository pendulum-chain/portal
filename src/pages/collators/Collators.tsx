import CollatorRewards from './CollatorRewards';
import CollatorsTable from './CollatorsTable';
import './styles.css';

function Collators() {
  return (
    <div className="overflow-x-auto mx-20 collators-list-container">
      <CollatorRewards />
      <CollatorsTable />
    </div>
  );
}

export default Collators;
