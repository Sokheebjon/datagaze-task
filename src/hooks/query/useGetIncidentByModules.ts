import {request} from "@/services/api";
import {useQuery} from "@tanstack/react-query";

interface TModuleTypes {
    name: string;
    value: number;
    percentage: number;
}

interface TTimelineTypes extends Omit<TModuleTypes, "percentage"> {
    low:  number,
    medium: number,
    high: number,
}

interface TRulesTypes extends TModuleTypes{
    _id: string;
}

export interface TTotalTypes {
    total: number,
    low: number,
    medium: number,
    high: number,
    block: number,
    warn: number,
    unrated: number,
    real: number,
    false: number
}

export interface TIncidentMyModulesDto {
    action: TModuleTypes[],
    severity: TModuleTypes[],
    doctype: TModuleTypes[],
    channel: TModuleTypes[],
    rate: TModuleTypes[],
    timeline: TTimelineTypes[],
    "rule": TRulesTypes[],
    total: TTotalTypes[]
}


export const useGetIncidentByModules = () => {
    return useQuery<TIncidentMyModulesDto, Error>({
        queryKey: ["/main/dashboard/incidents/all-time"],
        queryFn: async () => {
            return await request.get('/main/dashboard/incidents/all-time');
        }
    });
};
