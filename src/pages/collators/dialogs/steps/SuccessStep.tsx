import { FC } from 'preact/compat';
import SuccessDialogIcon from '../../../../assets/dialog-status-success';

interface SuccessStepProps {
  title: string;
  description: string;
}

export const SuccessStep: FC<SuccessStepProps> = ({ title, description }) => (
  <div className="flex flex-col items-center justify-between">
    <SuccessDialogIcon />
    <div className="mt-4" />
    <h2 className="text-xl">{title}</h2>
    <p className="text-sm dark:text-neutral-400 text-neutral-500 mt-2 mx-4 sm:mx-16 text-center">{description}</p>
  </div>
);
