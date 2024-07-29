import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AssetsListState {
    assetsListData: any[],
    assetDataFor101: any[],
    currentAssetDetail: any,
    removeAssetItem: any,
    isRemoveAsset: boolean;
}

const initialState: AssetsListState = {
    assetsListData: [],
    assetDataFor101: [],
    currentAssetDetail: null,
    removeAssetItem: null,
    isRemoveAsset: true
};

export const assetsListDataSlice = createSlice({
    name: 'assetData',
    initialState,
    reducers: {
        addAssetssListData: (state, action: PayloadAction<any>) => {
            state.assetsListData.push(action.payload);
        },
        addNewAssetDataAsPerProjectId: (state, action: PayloadAction<any>) => {
            const [assetList, id] = action.payload;
            assetList.map((listItem: any) => {
                state.assetsListData.map((item: any) => {
                    (item.id === id) && item.data.assets.push(listItem);
                });
            });

        },
        addCurrentAssetDetails: (state, action: PayloadAction<any>) => {
            state.currentAssetDetail = action.payload;
        },
        removeIconFile: (state, action: PayloadAction<any>) => {
            state.removeAssetItem = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { removeIconFile, addAssetssListData, addNewAssetDataAsPerProjectId, addCurrentAssetDetails } = assetsListDataSlice.actions;

export default assetsListDataSlice.reducer;