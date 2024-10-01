import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import { useTranslation } from "react-i18next";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart.tsx";
import {Bar, BarChart, XAxis, YAxis} from "recharts";
import {TIncidentMyModulesDto, useGetIncidentByModules} from "@/hooks/query/useGetIncidentByModules.ts";
import get from "lodash/get";


/* eslint-disable  @typescript-eslint/no-explicit-any */
const IncidentByModules = () => {
    const {t} = useTranslation();
    const incidentByModulesQuery = useGetIncidentByModules();
    const incidentByModulesData = get(incidentByModulesQuery, "data.data", {}) as TIncidentMyModulesDto;

    const data = incidentByModulesData?.doctype?.reduce((acc:any, item) => {
        const itemKey = item?.name?.split(" ")?.join("_").toLowerCase();
        acc[itemKey] = item?.percentage;
        return acc;
    }, {})

    const chartData = [
        data,
    ]

    const chartConfig = incidentByModulesData?.doctype?.reduce((acc: any, item, index) => {
        const itemKey = item?.name?.split(" ")?.join("_").toLowerCase();
        acc[itemKey] = {
            label: `${item?.name} (${item?.percentage}%)`,
            color: `hsl(var(--chart-${index + 1}))`,
        }
        return acc
    }, {}) as ChartConfig;

    return (
        <Card>
            <CardHeader>
                <PageHeaderSecondary>{t("dashboard.incident_by_modules")}</PageHeaderSecondary>
            </CardHeader>
            <CardContent>
                {incidentByModulesQuery.isLoading ? <div className="text-center">
                    {t("loading")}
                </div> : <ChartContainer style={{width: "100%", height: 130}} config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        stackOffset="expand"
                        margin={{
                            left: -20,
                        }}
                    >
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            hide
                        />
                        <ChartLegend content={<ChartLegendContent  />} />
                        {
                            Object.keys(chartConfig).map((key) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    stackId="a"
                                    fill={chartConfig[key].color}
                                />
                            ))
                        }
                    </BarChart>
                </ChartContainer>}
            </CardContent>
        </Card>
    )
}

export default IncidentByModules;