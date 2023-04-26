import { PropsWithChildren, useState } from 'react';
import { Button, Checkbox, Modal, Theme } from 'react-daisyui';
import { CloseButton } from './components/CloseButton';
import { useLocalStorage } from './hooks/useLocalStorage';

const EXPIRE_DATE = 30 * 24 * 60 * 60; // 30 days in seconds

const TermsAndConditions = (p: PropsWithChildren) => {
  const { state, set } = useLocalStorage<string | undefined>({ key: 'termsAndConditions', expire: EXPIRE_DATE });
  const [checked, setChecked] = useState<boolean>(false);

  const acceptTerms = () => {
    set('accepted');
  };

  return state ? (
    <></>
  ) : (
    <Modal open={true} style={{ borderRadius: '5px' }}>
      <Modal.Header className="text-3xl">T&C</Modal.Header>
      <Modal.Body>
        <div className="text-lg mb-4">Alternative links can be found in the docs.</div>
        <div className="text-lg mb-5">
          {'By clicking Agree you accept the '}
          <a target="_blank" href="https://pendulumchain.org/legal/portal-terms-and-conditions">
            Terms and Conditions.
          </a>
        </div>
        <div className="text-lg flex">
          <Checkbox checked={checked} onClick={() => setChecked(!checked)} color="primary" size="md" />{' '}
          <span className="pl-2">Don't show this message again for 30 days.</span>
        </div>
      </Modal.Body>
      <Modal.Actions className="justify-center mt-10">
        <Button className="px-12 text-thin w-full" color="primary" onClick={acceptTerms} disabled={!checked}>
          Agree
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TermsAndConditions;
