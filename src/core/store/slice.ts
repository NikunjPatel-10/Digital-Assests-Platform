import { createSlice } from '@reduxjs/toolkit';

export interface ToggleState {
  isAddNewProjectOpen: boolean,
  isIconModalOpen: boolean,
  isIconDetailModalOpen: boolean,
  isAssetModalOpen: boolean,
  isAssetDetailModalOpen: boolean,
}

const initialState: ToggleState = {
  isAddNewProjectOpen: false,
  isIconModalOpen: false,
  isIconDetailModalOpen: false,
  isAssetModalOpen: false,
  isAssetDetailModalOpen: false,
};

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleAddNewProjectModal: (state: any) => {
      state.isAddNewProjectOpen = !state.isAddNewProjectOpen;
    },
    toggleAddNewIconsModal: (state: any) => {
      state.isIconModalOpen = !state.isIconModalOpen;
    },
    toggleIconsDetailModal: (state: any) => {
      state.isIconDetailModalOpen = !state.isIconDetailModalOpen;
    },
    openIconsDetailModal: (state: any) => {
      state.isIconDetailModalOpen = true;
    },
    closeIconsDetailModal: (state: any) => {
      state.isIconDetailModalOpen = false;
    },
    toggleAddNewAssetsModal: (state: any) => {
      state.isAssetModalOpen = !state.isAssetModalOpen;
    },
    toggleAssetsDetailModal: (state: ToggleState) => {
      state.isAssetDetailModalOpen = !state.isAssetDetailModalOpen;
    },
    openAssetDetailModal: (state: ToggleState) => {
      state.isAssetDetailModalOpen = true;
    },
    closeAssetDetailModal: (state: ToggleState) => {
      state.isAssetDetailModalOpen = false;
    },
  },
});



// Action creators are generated for each case reducer function
export const {
  toggleAddNewProjectModal,
  toggleAddNewIconsModal,
  toggleIconsDetailModal,
  openIconsDetailModal,
  closeIconsDetailModal,
  toggleAddNewAssetsModal,
  toggleAssetsDetailModal,
  openAssetDetailModal,
  closeAssetDetailModal,
} = toggleSlice.actions;

export default toggleSlice.reducer;