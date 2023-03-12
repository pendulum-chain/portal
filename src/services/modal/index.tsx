import { ComponentChildren, VNode } from 'preact';
import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'preact/compat';

export type ModalState = { type?: number; props?: Dict };
export type ToggleModal = (type?: number | ModalState) => void;

const ModalStateContext = createContext<ModalState | undefined>(undefined);
const ModalToggleContext = createContext<ToggleModal | undefined>(undefined);

export const useModalState = (): ModalState => {
  return useContext(ModalStateContext) as ModalState;
};
export const useModalToggle = (): ToggleModal => {
  return useContext(ModalToggleContext) as ToggleModal;
};
export const useModal = (): [ModalState, ToggleModal] => [
  useModalState(),
  useModalToggle(),
];

export interface ModalProviderProps {
  children: ComponentChildren;
}
const ModalProvider = ({ children }: ModalProviderProps): VNode | null => {
  const [state, setModalState] = useState<ModalState>({});

  const toggleModal: ToggleModal = useCallback((type = {}) => {
    if (typeof type === 'number') setModalState({ type });
    else setModalState(type);
  }, []);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalToggleContext.Provider value={toggleModal}>
        {children}
      </ModalToggleContext.Provider>
    </ModalStateContext.Provider>
  );
};

export default ModalProvider;
