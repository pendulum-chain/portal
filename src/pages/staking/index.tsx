import { CollatorRewards } from './CollatorRewards/CollatorRewards';
import CollatorsTable from './CollatorsTable';
import './styles.css';

const Collators = () => (
  <div className="collators-list-container overflow-x-hidden lg:mx-10 xl:mx-40">
    <CollatorRewards />
    <CollatorsTable />
  </div>
);

export default Collators;
