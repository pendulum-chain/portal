import { useCallback } from 'preact/compat';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swap from '../../components/Swap';

export function Amm(): JSX.Element {
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
    </>
  );
}
