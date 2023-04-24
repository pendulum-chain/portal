import { FC } from 'preact/compat';
import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';

const ComingSoonTag: FC = () => {
  return <div className="coming-soon-tag">Coming soon!</div>;
};

export default ComingSoonTag;
