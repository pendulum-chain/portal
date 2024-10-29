// @todo remove this component! use unified modal component
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useCallback, useContext, useState } from 'react';

export type ModalTypes = 'AddLiquidity' | 'WithdrawLiquidity' | 'Redeem';

export type ModalState<T extends Dict<any> = Dict<any>> = {
  type?: ModalTypes;
  props?: T;
};
export type ToggleModal<T extends Dict<any> = Dict<any>> = (type?: ModalTypes | ModalState<T>) => void;

const ModalStateContext = createContext<ModalState | undefined>(undefined);
const ModalToggleContext = createContext<ToggleModal | undefined>(undefined);

export const useModalState = <T extends Dict<any>>(): ModalState<T> => {
  return useContext(ModalStateContext) as ModalState<T>;
};
export const useModalToggle = <T extends Dict<any>>(): ToggleModal<T> => {
  return useContext(ModalToggleContext) as ToggleModal<T>;
};
export const useModal = <T extends Dict<any>>(): [ModalState<T>, ToggleModal<T>] => [useModalState(), useModalToggle()];

export interface ModalProviderProps {
  children: JSX.Element | JSX.Element[];
}
const ModalProvider = ({ children }: ModalProviderProps): JSX.Element | null => {
  const [state, setModalState] = useState<ModalState>({});

  const toggleModal: ToggleModal = useCallback((type) => {
    if (type === undefined) {
      setModalState({});
    } else if (typeof type === 'string') {
      setModalState({ type });
    } else setModalState(type);
  }, []);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalToggleContext.Provider value={toggleModal}>{children}</ModalToggleContext.Provider>
    </ModalStateContext.Provider>
  );
};

export default ModalProvider;
