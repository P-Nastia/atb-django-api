import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/createBaseQuery";
import type {ILoginResponse, IUserItem} from "../types/users";
import {serialize} from "object-to-formdata";

export interface IRegisterFormData {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirm: string;
    image: File | null;
}

export const userService = createApi({
    reducerPath: 'userService',
    baseQuery: createBaseQuery('users'),
    tagTypes: ['Users'],

    endpoints: (builder) => ({
        getUsers: builder.query<IUserItem[], void>({
            query: () => {
                return {
                    url: '',
                    method: 'GET'
                };
            },
            providesTags: ["Users"]
        }),
        registerUser: builder.mutation<ILoginResponse, IRegisterFormData>({

            query: (credentials) => {
                const formData = new FormData();

                Object.entries(credentials).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        formData.append(key, value);
                    }
                });

                return {
                    url: 'register/',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ["Users"]
        }),
        registerAntd: builder.mutation<ILoginResponse, IRegisterFormData>({
            query: (credentials) => {
                const formData = serialize(credentials);

                return {
                    url: 'register/',
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ["Users"]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useRegisterUserMutation,
    useRegisterAntdMutation
} = userService;