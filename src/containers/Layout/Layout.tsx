import {useMemo} from "react";
import Sidebar from "@/containers/Layout/Sidebar";
import {Outlet, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {
    AccountsIcon,
    ComputerIcon,
    ContactsIcon,
    DashboardIcon,
    DetectedIncidentsIcon,
    PolicyRulesIcon, SettingsIcon, SystemLogsIcon,
    SystemReportsIcon
} from "@/assets/icons";
import {PageHeader} from "@/components/ui/PageHeader.tsx";
import {Badge} from "@/components/ui/badge.tsx";


const Layout = () => {
    const {t} = useTranslation();
    const {pathname} = useLocation();


    const menus = useMemo(() => [
        {
            title: t("sidebar.dashboard"),
            icon: DashboardIcon,
            variant: "secondary",
            link: "/dashboard"
        },
        {
            title: t("sidebar.controlled_employees"),
            icon: ContactsIcon,
            variant: "ghost",
            link: "/controlled-employees"
        },
        {
            title: t("sidebar.controlled_computers"),
            icon: ComputerIcon,
            variant: "ghost",
            link: "/controlled-computers"
        },
        {
            title: t("sidebar.policy_rules"),
            icon: PolicyRulesIcon,
            variant: "ghost",
            link: "/policy-rules"
        },
        {
            title: t('sidebar.detected_ingredients'),
            icon: DetectedIncidentsIcon,
            variant: "ghost",
            link: "/detected-incidents",
            label: <Badge className="bg-red-100 text-red-700" variant="destructive">{238}</Badge>
        },
        {
            title: t('sidebar.system_reports'),
            icon: SystemReportsIcon,
            variant: "ghost",
            link: "/system-reports"
        },
        {
            title: t('sidebar.accounts'),
            icon: AccountsIcon,
            variant: "ghost",
            link: "/accounts"
        },
        {
            title: t('sidebar.settings'),
            icon: SettingsIcon,
            variant: "ghost",
            link: "/settings"
        },
        {
            title: t('sidebar.system_logs'),
            icon: SystemLogsIcon,
            variant: "ghost",
            link: "/system-logs"
        },
    ], [t])

    const menu = menus.find(menu => menu.link === pathname);

    return (
        <div className="bg-neutral-100">
            <div className="grid grid-cols-[340px_1fr] gap-3">
                <Sidebar menus={menus}/>

                <div className="p-6 max-h-screen overflow-y-auto">
                    <div className="w-full pb-6">
                        <PageHeader>{menu?.title}</PageHeader>
                    </div>
                    <Outlet/>
                </div>

            </div>
        </div>
    )
}

export default Layout;
