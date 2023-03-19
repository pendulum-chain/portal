import { useCallback } from 'preact/compat';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BackstopPool from '../../components/Pools/Backstop';
import SwapPools from '../../components/Pools/Swap';
import Swap from '../../components/Swap';

export function Amm(): JSX.Element | null {
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
    <>
      <div id="amm" className="center mt-8">
        <Swap
          from={params.get('from') || undefined}
          to={params.get('to') || undefined}
          onChange={onChange}
        />
      </div>
      <div className="my-12">
        {
          // ! TODO: get swap pools and user connected data
        }
        <SwapPools data={undefined} isLoading={false} />
      </div>
      <div className="center my-12">
        {
          // ! TODO: get backstop pool and info
        }
        <BackstopPool data={undefined} isLoading={false} />
      </div>
    </>
  );
}
