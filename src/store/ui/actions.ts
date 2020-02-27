import { UIActions, UIActionType } from '.';
import { ModalTypes } from '../../components/Modal';
import { ToastOptions } from '../../components/Toast';

// TypeScript infers that this function is returning SendMessageAction
export function toggleDrawer(value: boolean): UIActionType {
  return {
    type: UIActions.TOGGLE_DRAWER,
    payload: {
      value,
    },
  };
}

export function openLoader(message?: string): UIActionType {
  return {
    type: UIActions.OPEN_LOADER,
    payload: {
      message,
    },
  };
}

export function closeLoader(): UIActionType {
  return {
    type: UIActions.CLOSE_LOADER,
    payload: {},
  };
}

export function openModal(modalType: ModalTypes): UIActionType {
  return {
    type: UIActions.OPEN_MODAL,
    payload: {
      type: modalType,
    },
  };
}

export function closeModal(): UIActionType {
  return {
    type: UIActions.CLOSE_MODAL,
    payload: {},
  };
}

export function showToast({
  message,
  options,
}: {
  message: string;
  options?: ToastOptions;
}): UIActionType {
  return {
    type: UIActions.SHOW_TOAST,
    payload: {
      message,
      options,
    },
  };
}

export function closeToast(): UIActionType {
  return {
    type: UIActions.CLOSE_TOAST,
    payload: {},
  };
}
