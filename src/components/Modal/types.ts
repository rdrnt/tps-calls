export type ModalTypes =
  | 'project-info'
  | 'mobile-app-download'
  | 'incident-filters';

export interface ModalProps {
  close: () => void;
}
