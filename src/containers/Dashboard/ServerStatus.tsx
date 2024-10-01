import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {useTranslation} from "react-i18next";
import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import ProgressChart from "@/components/ProgressChart";
import {TServerStatusDto, useGetServerStatus} from "@/hooks/query/useServerStatusQuery.ts";
import get from "lodash/get";

const ServerStatus = () => {
    const {t} = useTranslation()
    const serverStatusQuery = useGetServerStatus()
    const serverStatusData = get(serverStatusQuery, "data.data", {}) as TServerStatusDto
    const ramInPercent = (serverStatusData?.ram?.used / serverStatusData?.ram?.total) * 100;
    const licenseInPercent = (+serverStatusData?.license?.licensedCount / +serverStatusData?.license?.totalLicenseCount) * 100;

    return (
        <Card>
            <CardHeader>
                <PageHeaderSecondary>{t("dashboard.server_status")}</PageHeaderSecondary>
            </CardHeader>
            <CardContent>
                {
                    serverStatusQuery.isLoading ? <div className="text-center">
                        Loading...
                    </div> : <>
                        <ProgressChart label={t("dashboard.cpu_usage")} value={serverStatusData?.cpu} prefix="%"/>
                        <ProgressChart label={t("dashboard.memory_usage")} value={ramInPercent} prefix="%"/>
                        <ProgressChart label={t("dashboard.disk_usage")} value={Number(serverStatusData?.diskInfo?.usedPercentage)} prefix="%"/>
                        <ProgressChart label={t("dashboard.licence_usage")} value={licenseInPercent} prefix="%"/>
                    </>
                }
            </CardContent>
        </Card>
    )
}

export default ServerStatus;