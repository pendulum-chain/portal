import { ToastOptions, toast } from 'react-toastify';

export enum ToastMessage {
  BRIDGE_CONNECTION_ERROR = 'BRIDGE_CONNECTION_ERROR',
  NODE_CONNECTION_ERROR = 'NODE_CONNECTION_ERROR',
  TX_SUBMISSION_FAILED = 'TX_SUBMISSION_FAILED',
  UPDATED_DELEGATOR_REWARDS = 'UPDATED_DELEGATOR_REWARDS',
  NO_WALLET_SELECTED = 'NO_WALLET_SELECTED',
  BUYOUT_ERROR = 'BUYOUT_ERROR',
  WALLET_ALREADY_OPEN_PENDING_CONNECTION = 'WALLET_ALREADY_OPEN_PENDING_CONNECTION',
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARNING = 'WARNING',
}

type ToastSettings = {
  message: string;
  options: ToastOptions;
};

const ToastProperties: Record<ToastMessage, ToastSettings> = {
  [ToastMessage.BRIDGE_CONNECTION_ERROR]: {
    message: 'Could not establish connection with the bridge...',
    options: {
      toastId: ToastMessage.BRIDGE_CONNECTION_ERROR,
      type: 'error',
    },
  },
  [ToastMessage.NODE_CONNECTION_ERROR]: {
    message: 'Error while connecting to the node. Refresh the page to re-connect.',
    options: {
      toastId: ToastMessage.NODE_CONNECTION_ERROR,
      type: 'error',
    },
  },
  [ToastMessage.TX_SUBMISSION_FAILED]: {
    message: 'Transaction submission failed',
    options: {
      toastId: ToastMessage.TX_SUBMISSION_FAILED,
      type: 'error',
    },
  },
  [ToastMessage.UPDATED_DELEGATOR_REWARDS]: {
    message: 'Delegator rewards updated',
    options: {
      toastId: ToastMessage.UPDATED_DELEGATOR_REWARDS,
      type: 'error',
    },
  },
  [ToastMessage.NO_WALLET_SELECTED]: {
    message: 'No wallet account selected',
    options: {
      toastId: ToastMessage.NO_WALLET_SELECTED,
      type: 'error',
    },
  },
  [ToastMessage.ERROR]: {
    message: 'An error occurred',
    options: {
      type: 'error',
    },
  },
  [ToastMessage.INFO]: {
    message: 'Info',
    options: {
      type: 'info',
    },
  },
  [ToastMessage.WARNING]: {
    message: 'Warning',
    options: {
      type: 'warning',
    },
  },
  [ToastMessage.BUYOUT_ERROR]: {
    message: 'A buyout error occurred',
    options: {
      type: 'error',
      toastId: ToastMessage.BUYOUT_ERROR,
    },
  },
  [ToastMessage.WALLET_ALREADY_OPEN_PENDING_CONNECTION]: {
    message: 'There is already an open pending connection for this wallet. Please close it and try again.',
    options: {
      toastId: ToastMessage.WALLET_ALREADY_OPEN_PENDING_CONNECTION,
      type: 'warning',
    },
  },
};

export function showToast(message: ToastMessage, customMessage?: string) {
  if (customMessage) {
    return toast(customMessage, ToastProperties[message].options);
  }

  return toast(ToastProperties[message].message, ToastProperties[message].options);
}

export type ShowToast = typeof showToast;
