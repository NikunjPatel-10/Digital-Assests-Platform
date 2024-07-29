import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from "./slice";
import projectDataReducer from "./projectListData";
import iconDataReducer, { iconListDataSlice } from "./iconListData";
import assetDataReducer from './assetListData';
import projectPageReducer from './projectPageSlice';
import { projectApi } from '../../pages/projects/utility/services/projectList.service';
import { iconApi } from '../../pages/icons/utility/services/iconsListById.service';

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [iconApi.reducerPath]: iconApi.reducer,
    toggle: toggleReducer,
    projectData: projectDataReducer,
    iconData: iconDataReducer,
    assetData: assetDataReducer,
    projectpagination: projectPageReducer,
    categories: iconListDataSlice.reducer,
    styles: iconListDataSlice.reducer,
    noDataFlag: iconListDataSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      projectApi.middleware,
      iconApi.middleware
    ])
});

export type RootState = ReturnType<typeof store.getState>;