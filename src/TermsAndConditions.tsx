import { PropsWithChildren, useState } from 'react';
import { Button, Checkbox, Link, Modal } from 'react-daisyui';
import { useLocalStorage, LocalStorageKeys } from './hooks/useLocalStorage';

const TermsAndConditions = (_props: PropsWithChildren) => {
  const { state, set } = useLocalStorage<string | undefined>({ key: LocalStorageKeys.TERMS_AND_CONDITIONS });
  const [checked, setChecked] = useState<boolean>(false);

  const acceptTerms = () => {
    set('accepted');
  };

  return state ? (
    <></>
  ) : (
    <Modal open={true} style={{ borderRadius: '5px' }}>
      <Modal.Header className="text-3xl">T&Cs</Modal.Header>
      <Modal.Body>
        <div className="mb-5 text-lg">
          <Link
            style={{ textDecoration: 'underline' }}
            color="accent"
            target="_blank"
            href="https://pendulumchain.org/legal/portal-terms-and-conditions"
          >
            View Terms and Conditions
          </Link>
        </div>
        <div className="flex text-lg">
          <Checkbox checked={checked} onClick={() => setChecked(!checked)} color="primary" size="md" />
          <span className="pl-2">I have read and accept the terms and conditions</span>
        </div>
      </Modal.Body>
      <Modal.Actions className="mt-10 justify-center">
        <Button className="text-thin w-full px-12" color="primary" onClick={acceptTerms} disabled={!checked}>
          Agree
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TermsAndConditions;
