import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Loader } from '../../components/Loader';
import { ModalTypes } from '../../components/Modal';

export interface UIState {
  drawerOpen: boolean;
  loader: Loader;
  modal: {
    open: boolean;
    type?: ModalTypes;
  };
}

const initialState: UIState = {
  drawerOpen: false,
  loader: {
    open: false,
    message: undefined,
  },
  modal: {
    open: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDrawer: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    openLoader: (state, action: PayloadAction<string | undefined>) => {
      state.loader = {
        open: true,
        message: action.payload,
      };
    },
    closeLoader: state => {
      state.loader = {
        open: false,
        message: undefined,
      };
    },
    openModal: (state, action: PayloadAction<ModalTypes>) => {
      state.modal = {
        open: true,
        type: action.payload,
      };
    },
    closeModal: state => {
      state.modal = {
        open: false,
      };
    },
  },
});

export const { toggleDrawer, openLoader, closeLoader, openModal, closeModal } =
  uiSlice.actions;

export default uiSlice.reducer;
