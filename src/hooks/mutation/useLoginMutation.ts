import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {request} from "@/services/api.ts";

interface TLoginMutation {
    username: string;
    password: string;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface TResponseMutation {
    email: string;
    firstName: string;
    group: any[];
    id: string;
    lastName: string;
    role: string;
    token: string;
    username: string;
}

export const useLoginMutation = <
    Variables = TLoginMutation,
    Response = TResponseMutation,
    Error = any,
>(
    options: UseMutationOptions<AxiosResponse<Response>, Error, Variables> = {},
) =>
    useMutation<AxiosResponse<Response>, Error, Variables>({
        mutationFn: (data: Variables) => {
            return request.post('/account/login', data)
        },
        ...options,
    });
