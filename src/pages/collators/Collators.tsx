import CollatorRewards from './CollatorRewards';
import CollatorsTable from './CollatorsTable';
import './styles.css';

function Collators() {
  return (
    <div className="overflow-x-hidden xl:mx-20 lg:mx-5 collators-list-container">
      <CollatorRewards />
      <CollatorsTable />
    </div>
  );
}

export default Collators;
