import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../../shared/utility/services/axiosBaseQuery.service";
import { baseUrl } from "../../../../environments/environment";

const baseApi = `${baseUrl}/api`;
export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: axiosBaseQuery({
        baseUrl: baseApi
    }),
    tagTypes: ['Project'],

    endpoints: (builder) => ({
        getProjectList: builder.query<any, { page: number, perPage: number, searchQuery?: string, sort?: string; }>({
            query: ({ page, perPage, searchQuery, sort }) => ({
                url: 'project/search',
                method: 'POST',
                params: {
                    Page: page,
                    PerPage: perPage,
                    q: searchQuery,
                    sort,
                },
            }),
            providesTags: ['Project'],
            transformResponse: (response: any) => response.result
        }),

        addProject: builder.mutation<void, { projectName: string, projectLogo: File; }>({
            query: ({ projectName, projectLogo }) => {
                const formData = new FormData();
                formData.append('projectName', projectName);
                formData.append('projectLogo', projectLogo);

                return {
                    url: 'project',
                    method: 'POST',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };
            },
            invalidatesTags: ['Project'],
        }),
        deleteProject: builder.mutation<void, { projectId: number; }>({
            query: ({ projectId }) => ({
                url: `project/${projectId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Project'],
        })
    })
});

export const { useGetProjectListQuery, useAddProjectMutation, useDeleteProjectMutation } = projectApi;