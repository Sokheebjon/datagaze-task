import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {useCallback, useState} from "react";
import {AlertIcon, BellIcon, UserIcon} from "@/assets/icons";
import {useTranslation} from "react-i18next";
import useNotificationSocket from "@/hooks/useNotificationSocket.ts";
import {Button} from "@/components/ui/button.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";


const Notification = () => {
    const {t} = useTranslation();
    const [open, setOpen] = useState(false);
    const {notifications, setNotifications} = useNotificationSocket();

    const handleOpenChange = useCallback(() => {
        setOpen((prev) => !prev);
        if (open) {
            setNotifications([])
        }
    }, [open])


    return (
        <Sheet onOpenChange={handleOpenChange} open={open}>
            <SheetTrigger className="cursor-pointer">
                <Button className="bg-gray-100 relative p-3 rounded-lg" variant="ghost">
                    <BellIcon/>
                    <div
                        className="absolute inline-flex items-center justify-center w-8 h-6 text-xs font-bold bg-red-100 text-red-700 border-2 border-white rounded-lg -top-3 -end-3 dark:border-gray-900">
                        {notifications.length}
                    </div>
                </Button>
            </SheetTrigger>
            <SheetContent className="pr-1">
                <SheetHeader>
                    <SheetTitle>{t("notification.title")}</SheetTitle>
                </SheetHeader>
                    <ScrollArea className="h-[95vh] w-full p-4">
                        <ul>
                            {notifications.length === 0 && (
                                <div className="flex justify-center mt-4 text-gray-500 items-center gap-2">
                                    <p>{t("notification.no_notifications")}</p>
                                </div>
                            )}
                            {notifications.map((notification, index) => (
                                <li className="mb-3" key={index}>

                                    <div className="font-medium flex justify-start items-center gap-2 mb-1">
                                    <UserIcon/>
                                        <p>{notification?.employee}</p>
                                    </div>
                                    <div className="flex justify-start text-gray-500 items-center gap-2">
                                        <AlertIcon/>
                                        <p>{t("notification.number_of_incidents")}: {notification?.incidentsCount}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>

            </SheetContent>
        </Sheet>
    )
}

export default Notification;