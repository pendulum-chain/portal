import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swap from '../../../components/nabla/Swap';
import { OldForexAmmNotice } from '../../../components/nabla/common/OldForexAmmNotice';

const SwapPage = (): JSX.Element | null => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const onChange = useCallback(
    (from: string, to: string) => {
      navigate(`?from=${from}&to=${to}`, {
        replace: true,
      });
    },
    [navigate],
  );

  return (
    <div id="swap" className="center mt-6">
      <OldForexAmmNotice />
      <Swap from={params.get('from') || undefined} to={params.get('to') || undefined} onChange={onChange} />
    </div>
  );
};
export default SwapPage;
