import { TransactionProgress, TransactionProgressProps } from '../common/TransactionProgress';
import { Dialog } from '../../Dialog';

export type SwapProgressProps = {
  open: boolean;
  children?: JSX.Element;
  onClose: () => void;
  mutation?: TransactionProgressProps['mutation'];
};

export function SwapProgress({ mutation, children, onClose, open }: SwapProgressProps) {
  const content = mutation ? (
    <TransactionProgress mutation={mutation} onClose={onClose}>
      {children}
    </TransactionProgress>
  ) : (
    <></>
  );

  return <Dialog visible={open} onClose={onClose} content={content} actions={<></>} />;
}
