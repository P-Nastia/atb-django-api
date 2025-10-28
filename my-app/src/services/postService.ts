import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/createBaseQuery";
import type {IPostCreate, IPostItem} from "../types/posts";

export const postService = createApi({
    reducerPath: 'topicService',
    baseQuery: createBaseQuery('posts'),
    tagTypes: ['Posts'],

    endpoints: (builder) => ({

        getPosts: builder.query<IPostItem[], void>({
            query: () => {
                return {
                    url: '',
                    method: 'GET'
                };
            },
            providesTags: ["Posts"]
        }),

        createPost: builder.mutation<void, IPostCreate>({

            query: (credentials) => {
                const formData = new FormData();

                Object.entries(credentials).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        formData.append(key, value);
                    }
                });

                return {
                    url: '',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ["Posts"]
        }),
    }),
});

export const {
    useGetPostsQuery,
    useCreatePostMutation
} = postService;