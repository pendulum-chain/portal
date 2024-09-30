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
    <p className="mx-4 mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400 sm:mx-16">{description}</p>
  </div>
);
