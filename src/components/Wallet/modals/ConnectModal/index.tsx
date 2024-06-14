import { Button } from 'react-daisyui';
import { useState } from 'preact/hooks';
import { Dialog } from '../../../../pages/collators/dialogs/Dialog';
import { ConnectModalContent } from './ConnectModalContent';

export interface ConnectProps {
  isHeader?: boolean;
}

export const ConnectModal = ({ isHeader }: ConnectProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        size={isHeader ? 'sm' : undefined}
        className={isHeader ? 'h-auto min-h-[2.1rem] px-1 text-sm sm:px-3' : 'w-full'}
        color="primary"
        type="button"
        onClick={() => setVisible(true)}
      >
        Connect Wallet
      </Button>
      <Dialog
        visible={visible}
        headerText="Connect wallet"
        onClose={() => setVisible((state) => !state)}
        content={<ConnectModalContent />}
        actions={<></>}
      />
    </>
  );
};
