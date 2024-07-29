import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface ProjectPageState {
    projectData: any[];
    totalCount: number;
    projectsPerPage: number;
    currentPage: number;
}

const initialState: ProjectPageState = {
    projectData: [],
    totalCount: 0,
    projectsPerPage: 5,
    currentPage: 0,
};

export const projectPageSlice = createSlice({
    name: 'projectpagination',
    initialState,
    reducers: {
        fetchProjectsForPage: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
        onNavigatePrev: (state) => {
            state.currentPage--;
        },
        onNavigateNext: (state) => {
            state.currentPage++;
        },
        onChangeProjectsPerPage: (state, action: PayloadAction<number>) => {
            state.projectsPerPage = action.payload;
        },
    },
});

export const {
    fetchProjectsForPage,
    onNavigateNext,
    onNavigatePrev,
    onChangeProjectsPerPage
} = projectPageSlice.actions;

// Selectors
export const selectProjectsTotalPage = (state: RootState) => state.projectpagination.totalCount;
export const selectProjectsPerPage = (state: RootState) => state.projectpagination.projectsPerPage;
export const selectCurrentPage = (state: RootState) => state.projectpagination.currentPage;
export const selectTotalPages = (state: RootState) => Math.ceil(state.projectpagination.totalCount / state.projectpagination.projectsPerPage);


export default projectPageSlice.reducer;
