import { baseUrl } from "../../../../environments/environment";
import {
  IGetCategoryResponse,
  IGetIconList,
  IGetStyleResponse,
} from "../../../projects/utility/models/projectList.model";
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../../shared/utility/services/axiosBaseQuery.service";


const baseApi = `${baseUrl}/api`;
export const iconApi = createApi({
  reducerPath: "iconApi",
  baseQuery: axiosBaseQuery({
    baseUrl: baseApi,
  }),
  tagTypes: ["Icon", "Category", "Style"],
  endpoints: (builder) => ({


    getIconListById: builder.query<
      IGetIconList,
      {
        projectId: number;
        page: number;
        perPage: number;
        searchQuery?: string;
        sort?: string;
      }
    >({
      query: ({ projectId, page, perPage, searchQuery, sort = "-iconId" }) => ({
        url: `project/${projectId}/icons`,
        method: "POST",
        params: {
          page,
          perPage,
          q: searchQuery,
          sort,
        },
        data: { categoryId: null, styleId: null },
      }),
      providesTags: ["Icon"],
      transformResponse: (response: any) => response.result,
    }),

    addIcon: builder.mutation<void,
      {
        projectId: number,
        iconName: string,
        categoryId: number,
        styleId: number,
        tag: string, images:
        {
          file: File, imageName: string;
        }[];
      }>({
        query: ({ projectId, iconName, categoryId, styleId, tag, images }) => {
          const formData = new FormData();
          formData.append('iconName', iconName);
          formData.append('categoryId', categoryId.toString());
          formData.append('styleId', styleId.toString());
          formData.append('tag', tag);

          images.forEach(({ file, imageName }) => {
            formData.append('attachments', file);
            formData.append('imageName', imageName);
          });

          return {
            url: 'icon',
            method: 'POST',
            data: formData,
            params: {
              projectId,
            },
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
        },
        invalidatesTags: ['Icon'],
      }),

    deleteIcon: builder.mutation<void, { iconId: number; }>({
      query: ({ iconId }) => ({
        url: `icon/${iconId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Icon"],
    }),

    getIconCategory: builder.query<IGetCategoryResponse, void>({
      query: () => ({
        url: "category",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    getIconStyle: builder.query<IGetStyleResponse, void>({
      query: () => ({
        url: "style",
        method: "GET",
      }),
      providesTags: ["Style"],
    }),
  }),
});

export const {
  useGetIconListByIdQuery,
  useAddIconMutation,
  useDeleteIconMutation,
  useGetIconCategoryQuery,
  useGetIconStyleQuery,
} = iconApi;
