import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IIcon } from "../../pages/projects/utility/models/projectList.model";

export interface ProjectListState {
  iconListData: any[];
  iconDataFor101: any[];
  currentIconDetail: any;
  removeIconItem: any;
  isRemoveIcon: boolean;

  currentPage: number;
  totalCount: number;
  iconsPerPage: number;
  searchQuery: string;
  loading: boolean;
  categories: any[];
  styles: any[];
  noDataFlag: boolean;
}

const initialState: ProjectListState = {
  iconListData: [],
  iconDataFor101: [],
  currentIconDetail: null,
  removeIconItem: null,
  isRemoveIcon: true,

  totalCount: 0,
  iconsPerPage: 15,
  currentPage: 0,
  searchQuery: '',
  loading: false,
  categories: [],
  styles: [],
  noDataFlag: false
};

export const iconListDataSlice = createSlice({
  name: "iconData",
  initialState,
  reducers: {
    addIconsListData: (state, action: PayloadAction<any>) => {
      state.iconListData = [];
      state.iconListData.push(action.payload);
    },
    addNewIconDataAsPerProjectId: (state, action: PayloadAction<[IIcon[], number]>) => {
      const [iconList, id] = action.payload;
      iconList.map((listItem: any) => {
        state.iconListData.map((item: any) => {
          item.id === id && item.data.icons.push(listItem);
        });
      });
    },

    addCurrentIconDetails: (state, action: PayloadAction<any>) => {
      state.currentIconDetail = action.payload;
    },
    removeIconFile: (state, action: PayloadAction<any>) => {
      state.removeIconItem = action.payload;
    },
    fetchIconsForPage: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    onNavigateNext: (state) => {
      state.currentPage++;
    },
    onAddPerPage: (state) => {
      state.iconsPerPage + 15;
    },
    onChangeIconsPerPage: (state, action: PayloadAction<number>) => {
      state.iconsPerPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    addStyles: (state, action: PayloadAction<any[]>) => {
      state.styles = action.payload;
    },
    setNoDataFlag: (state, action: PayloadAction<boolean>) => {
      state.noDataFlag = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  removeIconFile,
  addIconsListData,
  addNewIconDataAsPerProjectId,
  addCurrentIconDetails,

  fetchIconsForPage,
  onNavigateNext,
  onChangeIconsPerPage,
  setSearchQuery,
  addCategories,
  addStyles,
  setNoDataFlag,
  onAddPerPage
} = iconListDataSlice.actions;

// Selectors
export const selectIconListData = (state: RootState) => state.iconData.iconListData;
export const selectIconTotalPage = (state: RootState) => state.iconData.totalCount;
export const selectCurrentPage = (state: RootState) => state.iconData.currentPage;
export const selectIconsPerPage = (state: RootState) => state.iconData.iconsPerPage;
export const selectTotalPages = (state: RootState) => Math.ceil(state.iconData.totalCount / state.iconData.iconsPerPage);

export default iconListDataSlice.reducer;