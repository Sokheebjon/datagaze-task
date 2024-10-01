import {request} from "@/services/api";
import {useQuery} from "@tanstack/react-query";
import {TIncidentMyModulesDto} from "@/hooks/query/useGetIncidentByModules.ts";



interface TParametersType {
    params?: {
        start: string;
        end: string;
    }
}

export const useGetIncidentDynamicsQuery = ({ params }: TParametersType) => {
    return useQuery<TIncidentMyModulesDto, Error>({
        queryKey: ["/main/dashboard/incidents/all-time", params],
        queryFn: async () => {
            return await request.get('/main/dashboard/incidents/all-time', {params});
        }
    });
};
