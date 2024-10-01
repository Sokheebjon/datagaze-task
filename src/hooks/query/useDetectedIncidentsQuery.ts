import {request} from "@/services/api";
import {useQuery} from "@tanstack/react-query";

interface Group {
    _id: string;
    name: string;
}

interface Employee {
    _id: string;
    hostname: string;
    group: Group;
    id: string;
}

interface Computer {
    _id: string;
    pcname: string;
    macAddress: string;
    ipAddress: string;
    id: string;
}

interface Rule {
    _id: string;
    name: string;
    id: string;
}

export interface TDetectedIncidentsDto {
    _id: string;
    isViewed: boolean;
    rate: number;
    employee: Employee;
    computer: Computer;
    rule: Rule;
    time: string; // ISO 8601 formatted date-time string
    source: string;
    destination: string;
    fileName: string | null;
    channel: string;
    documentType: string;
    severity: number;
    action: string;
    id: string;
}

export interface TDetectedIncidentsMeta {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export enum ActionEnum {
    warn = 'warn',
    block = 'block',
}

export enum serverityEnum {
    low = 'low',
    medium = 'medium',
    high = 'high',
}


interface TParametersType {
    params?: {
        page: number;
        limit: number;
        action?: ActionEnum[];
        channel?: string[];
        severity?: serverityEnum[];
        doctype?: string[];
        search?: string;
        start?: string;
        end?: string;
    }
}

export const useDetectedIncidentsQuery = ({ params }:TParametersType) => {
    return  useQuery<TDetectedIncidentsDto, Error>({
        queryKey: ["/main/events/allincidents", params],
        queryFn: async () => {
            return await request.get('/main/events/allincidents', {params});
        }
    });
};
