import {request} from "@/services/api";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";

export enum TChannel {
    CLIPBOARD = "Clipboard",
    PRINT = "Print",
    KEYLOGGER = "Keylogger",
    EMAIL = "Email",
    'HTTP/S' = "HTTP/S",
    TELEGRAM = "Telegram",
    USB = "USB",
    SMB = "SMB"
}


export const useChannelQuery = (options?: Omit<UseQueryOptions<TChannel, AxiosError>, "queryKey">) => {
    return  useQuery<TChannel, AxiosError>({
        queryKey: ["/filters/incChannels"],
        queryFn: async () => {
            return await request.get('/filters/incChannels');
        },
        ...options
    });
};
