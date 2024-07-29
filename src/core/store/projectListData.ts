import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Project {
    projectId: number;
    projectName: string;
    projectLogo: string;
    imagetype: string;
    uniqueImageName: string;
    projectImagePath: string;
}

export interface ProjectListState {
    projectListData: Project[];
}

const initialState: ProjectListState = {
    projectListData: [],
};

export const projectListDataSlice = createSlice({
    name: 'projectData',
    initialState,
    reducers: {
        addProjectListData: (state, action: PayloadAction<Project[]>) => {
            state.projectListData = action.payload;
        },
        addNewProject: (state, action: PayloadAction<Project>) => {
            state.projectListData.push(action.payload);
        },
        fetchNewProjectData: (state, action: PayloadAction<Project[]>) => {
            state.projectListData = action.payload;
        }
    },
});

export const { addProjectListData, addNewProject, fetchNewProjectData } = projectListDataSlice.actions;

export default projectListDataSlice.reducer;
