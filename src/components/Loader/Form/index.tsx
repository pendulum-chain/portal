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
    <div className={`flex w-full flex-col gap-5 ${className}`}>
      {repeat(
        <div>
          {label && <Skeleton className="mb-1 h-[1rem] w-[8rem] rounded-md" />}
          <Skeleton className="h-[2.8rem] w-full rounded-md" />
        </div>,
        inputs,
      )}
      {textarea && (
        <div>
          {label && <Skeleton className="mb-1 h-[1rem] w-[8rem] rounded-md" />}
          <Skeleton className="h-[8rem] w-full rounded-md" />
        </div>
      )}
      {button && <Skeleton className="mt-6 h-[4rem] w-full rounded-md" />}
    </div>
  );
};

export default FormLoader;
