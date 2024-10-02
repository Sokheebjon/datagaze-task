import {useEffect, useState} from "react";
import socket from "@/socket.ts";

export interface TNotificationDataType {
    employee?: string;
    incidentsCount?: number;
}

const useNotificationSocket = () => {
    const [notifications, setNotifications] = useState<TNotificationDataType[]>([]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Successfully connected to the server!');
        });

        socket.on('notification', (data) => {
            setNotifications((prev) => [...prev, data]);
        });

        socket.on('connect_error', (error) => {
            console.error('Connection Error:', error);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the server.');
        });

    }, [])

    return {
        notifications,
        setNotifications,
    };
}

export default useNotificationSocket;