import { Button } from 'react-daisyui';
import { useState } from 'react';
import { ConnectModalDialog } from './ConnectModalDialog';

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
        Connect <span className="hidden md:block">&nbsp;Wallet</span>
      </Button>
      <ConnectModalDialog
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
};
