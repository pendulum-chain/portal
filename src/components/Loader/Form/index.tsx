import { repeat } from '../../../helpers/general';
import { Skeleton } from '../../Skeleton';

export type FormLoaderProps = {
  className?: string;
  label?: boolean;
  inputs?: number;
  textarea?: boolean;
  button?: boolean;
};

const FormLoader = ({
  className = '',
  label,
  inputs = 3,
  textarea = true,
  button = true,
}: FormLoaderProps): JSX.Element => {
  return (
    <div className={`flex flex-col w-full gap-5 ${className}`}>
      {repeat(
        <div>
          {label && <Skeleton className="h-[1rem] w-[8rem] rounded-md mb-1" />}
          <Skeleton className="h-[2.8rem] w-full rounded-md" />
        </div>,
        inputs,
      )}
      {textarea && (
        <div>
          {label && <Skeleton className="h-[1rem] w-[8rem] rounded-md mb-1" />}
          <Skeleton className="h-[8rem] rounded-md w-full" />
        </div>
      )}
      {button && <Skeleton className="h-[4rem] rounded-md w-full mt-6" />}
    </div>
  );
};

export default FormLoader;
