import {request} from "@/services/api";
import {useQuery} from "@tanstack/react-query";

export interface TServerStatusDto {
        cpu: number,
        ram: {
            used: number,
            total: number
        },
        dbSize: number,
        diskInfo: {
            totalGb: string,
            usedGb: string,
            freeGb: string,
            usedPercentage: string,
            freePercentage: string
        },
        license: {
            totalLicenseCount: number,
            licensedCount: string,
            notLicensedCount: number
        }
}


export const useGetServerStatus = () => {
   return  useQuery<TServerStatusDto, Error>({
        queryKey: ["/main/dashboard/system"],
        queryFn: async () => {
            return await request.get('/main/dashboard/system');
        }
    });
};
