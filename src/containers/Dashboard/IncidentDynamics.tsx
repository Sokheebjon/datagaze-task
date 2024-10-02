import {Card, CardContent,  CardHeader} from "@/components/ui/card.tsx";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts"
import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import {useTranslation} from "react-i18next";
import {useGetIncidentDynamicsQuery} from "@/hooks/query/useIncidentDynamicsQuery.tsx";
import {useCallback, useState} from "react";
import DateTimeRangePicker from "@/components/DateTimeRangePicker";
import {DateRange} from "react-day-picker";
import {format, toDate} from "date-fns";
import {DEFAULT_DATE_PICKER_PERIOD, utcDateFormatter} from "@/utils/constants.ts";
import get from "lodash/get";
import {TTotalTypes} from "@/hooks/query/useGetIncidentByModules.ts";


const IncidentDynamics = () => {
    const {t} = useTranslation();
    const [date, setDate] = useState<DateRange | null>(DEFAULT_DATE_PICKER_PERIOD);
    const start = format(toDate(date?.from as Date), utcDateFormatter);
    const end = format(toDate(date?.to as Date), utcDateFormatter);
    const incidentDynamicsQuery = useGetIncidentDynamicsQuery({
        params: {start, end}
    });
    const incidentDynamicsTotal = get(incidentDynamicsQuery, "data.data.total", []) as TTotalTypes[];

    const chartData = incidentDynamicsTotal[0] && Object.keys(incidentDynamicsTotal[0])?.map((key) => {
        return {
            label: key,
            value: incidentDynamicsTotal?.[0][key as keyof TTotalTypes]
        }
    })

    const handleApply = useCallback((newDate?: DateRange)=> {
        setDate(newDate as DateRange)
    }, [])


    const chartConfig = {
        value: {
            label: "Incidents",
            color: "#4778F5",
        },
    } satisfies ChartConfig


    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <PageHeaderSecondary>{t("dashboard.incident_dynamics")}</PageHeaderSecondary>
                    <DateTimeRangePicker onApply={handleApply}/>
                </div>
            </CardHeader>
            <CardContent>
                {
                    incidentDynamicsQuery.isLoading ? <div className="text-center">
                        {t("loading")}
                    </div> :
                        <ChartContainer style={{width: "100%", height: 200}} config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="label"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis
                                width={10}
                                dataKey="value"
                                tickLine={false}
                                axisLine={false}
                            />
                            <ChartTooltip
                                cursor={false}
                                contentStyle={{background: "#0B0C0E", color: "#fff"}}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Line
                                dataKey="value"
                                type="linear"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                }

            </CardContent>
        </Card>
    )
}

export default IncidentDynamics;