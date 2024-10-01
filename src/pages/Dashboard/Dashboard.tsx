import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import {useTranslation} from "react-i18next";
import ServerStatus from "@/containers/Dashboard/ServerStatus";
import IncidentDynamics from "@/containers/Dashboard/IncidentDynamics";
import IncidentByModules from "@/containers/Dashboard/IncidentByModules.tsx";
import DetectedIncidents from "@/containers/Dashboard/DetectedIncidents";

const Dashboard = () => {
    const {t} = useTranslation()

    return (
        <div>
            <div>
                <PageHeaderSecondary className="mb-3">{t("dashboard.statistics")}</PageHeaderSecondary>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <ServerStatus/>
                    <IncidentDynamics/>
                    <div className="col-span-2">
                        <IncidentByModules/>
                    </div>
                    <div className="col-span-2">
                        <DetectedIncidents/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;