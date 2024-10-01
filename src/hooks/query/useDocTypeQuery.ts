import {request} from "@/services/api";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";

export interface TDoctype {
    exactMatch: boolean;
    frequency: number
    id: string;
    name: string
    priority: number
}


export const useDocTypeQuery = (options?: Omit<UseQueryOptions<TDoctype, AxiosError>, "queryKey">) => {
    return  useQuery<TDoctype, AxiosError>({
        queryKey: ["/main/policies/doctypes"],
        queryFn: async () => {
            return await request.get('/main/policies/doctypes');
        },
        ...options
    });
};
