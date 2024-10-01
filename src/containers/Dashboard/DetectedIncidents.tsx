import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import {useTranslation} from "react-i18next";
import DataTable from "@/components/DataTable";
import {ColumnDef} from "@tanstack/react-table";
import {Card, CardHeader} from "@/components/ui/card";
import SearchInput from "@/components/SearchInput";
import {Button} from "@/components/ui/button";
import {BadgeIcon, BlockIcon, DownloadIcon, ExclamationMark} from "@/assets/icons";
import DateTimeRangePicker from "@/components/DateTimeRangePicker";
import {useCallback, useMemo, useState} from "react";
import {DateRange} from "react-day-picker";
import {
    dateFormatter,
    DEFAULT_DATE_PICKER_PERIOD,
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
    utcDateFormatter
} from "@/utils/constants.ts";
import {format, toDate} from "date-fns";
import {
    ActionEnum,
    TDetectedIncidentsDto,
    TDetectedIncidentsMeta,
    useDetectedIncidentsQuery
} from "@/hooks/query/useDetectedIncidentsQuery.ts";
import get from "lodash/get";
import {Badge} from "@/components/ui/badge.tsx";
import DetectedIncidentsFilter, {TFiltersType} from "@/containers/Dashboard/DetectedIncidentsFilter.tsx";
import {debounce} from "lodash";

const DetectedIncidents = () => {
    const {t} = useTranslation();
    const [date, setDate] = useState<DateRange | null>(DEFAULT_DATE_PICKER_PERIOD);
    const [filter, setFilter] = useState<TFiltersType | object>({});
    const [search, setSearch] = useState("");
    const start = format(toDate(date?.from as Date), utcDateFormatter);
    const end = format(toDate(date?.to as Date), utcDateFormatter);
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE);

    const detectedIncidentsQuery = useDetectedIncidentsQuery({
        params: {
            start,
            end,
            page: page,
            search,
            limit: limit,
            ...filter
        }
    });
    const detectedIncidents = get(detectedIncidentsQuery, "data.data.docs", []) as TDetectedIncidentsDto[];
    const detectedIncidentsMeta = get(detectedIncidentsQuery, "data.data", {}) as TDetectedIncidentsMeta;

    const pagination = {
        page: detectedIncidentsMeta.page,
        limit: detectedIncidentsMeta.limit,
        total: detectedIncidentsMeta.total,
        pages: detectedIncidentsMeta.pages,
        onPageChange: (page: number) => {
            setPage(page)
        },
        onPerPageChange: (perPage: number) => {
            setPage(DEFAULT_PAGE);
            setLimit(perPage)
        }
    }

    const handleApply = useCallback((newDate?: DateRange) => {
        setDate(newDate as DateRange)
    }, [])

    const columns: ColumnDef<TDetectedIncidentsDto>[] = useMemo(() => [
        {
            accessorKey: "count",
            header: "#",
            cell: ({row}) => (page - 1) * limit + row.index + 1
        },
        {
            accessorKey: "date",
            header: t("columns.date"),
            cell: ({row}) => dateFormatter(row.original.time)
        },
        {
            accessorKey: "employee",
            header: t("columns.employee"),
            cell: ({row}) => get(row.original, "employee.hostname", "")
        },
        {
            accessorKey: "group",
            header: t("columns.group"),
            cell: ({row}) => get(row.original, "employee.group.name", "")
        },
        {
            accessorKey: "computer_name",
            header: t("columns.computer_name"),
            cell: ({row}) => get(row.original, "computer.pcname", "")
        },
        {
            accessorKey: "document_type",
            header: t("columns.document_type"),
            cell: ({row}) => get(row.original, "documentType", "")
        },
        {
            accessorKey: "content",
            header: t("columns.content"),
            cell: ({row}) => get(row.original, "fileName", "")
        },
        {
            accessorKey: "chanel",
            header: t("columns.chanel"),
            cell: ({row}) => get(row.original, "channel", "")
        },
        {
            accessorKey: "severity",
            header: t("columns.severity"),
            cell: ({row}) => {
                const serverityCode = [
                    {
                        bgColor: '#26BD6C',
                        label: t('status.low')
                    },
                    {
                        bgColor: '#AE590A',
                        label: t('status.medium')
                    },
                    {
                        bgColor: '#A24343',
                        label: t('status.high')
                    }
                ]

                return <Badge
                    style={{background: serverityCode[row.original.severity]?.bgColor}} className="text-white py-1 px-2"
                    variant='outline'>
                    <BadgeIcon/>
                    <span className='ml-1'>
                        {serverityCode[row.original.severity]?.label}
                    </span>
                </Badge>
            }
        },
        {
            accessorKey: "rate",
            header: t("columns.rate"),
            cell: ({row}) => {
                const rateCode = [
                    {
                        bgColor: '#D1FAE4',
                        color: '#0F132499',
                        label: t('status.not_incident')
                    },
                    {
                        bgColor: '#FCE5E4',
                        color: '#9A1C13',
                        label: t('status.incident')
                    },
                    {
                        bgColor: '#E9EAEC',
                        color: '#0F132499',
                        label: t('status.not_rated')
                    }
                ]
                const rate = rateCode?.[row.original.rate]

                return (
                    <Badge
                        style={{background: rate?.bgColor, color: rate?.color}}
                        className="text-white py-1 px-2"
                        variant='outline'
                    >
                        <BadgeIcon/>
                        <span className='ml-1'>
                            {rate?.label}
                        </span>
                    </Badge>
                )
            }
        },
        {
            accessorKey: "action",
            header: t("columns.action"),
            cell: ({row}) => {
                const actions = [
                    {
                        color: '#E6483D',
                        label: t('status.block'),
                        icon: <BlockIcon/>,
                        action: ActionEnum.block
                    },
                    {
                        color: '#F48E2F',
                        label: t('status.warn'),
                        icon: <ExclamationMark/>,
                        action: ActionEnum.warn
                    }
                ]

                const action = actions.find(item => item.action === row.original.action)

                return <div className="flex" style={{color: action?.color}}>
                    {action?.icon && action.icon}
                    <span className='ml-1'>
                            {action?.label}
                    </span>
                </div>
            }
        },

    ], [t, page, limit]);

    const debounceSearch = useCallback(
        (value: string) => {
            setSearch(value);
        }, [],
    );
    const handler = debounce(debounceSearch, 600);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        handler(value);
    }, []);

    return (
        <div>
            <div className="flex mb-2 justify-between items-center">
                <PageHeaderSecondary>{t("dashboard.detected_incidents")}</PageHeaderSecondary>
                <DateTimeRangePicker onApply={handleApply}/>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <SearchInput
                            onChange={handleSearchChange}
                            className="w-1/5"
                            placeholder={t("form.remote_view")}
                        />
                        <div className="flex justify-end items-center gap-2">
                            <DetectedIncidentsFilter filter={filter as TFiltersType} setFilter={setFilter}/>
                            <Button className="flex items-center gap-1" variant="outline">
                                <DownloadIcon/> {t("button.export")}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <DataTable
                    loading={detectedIncidentsQuery.isLoading}
                    columns={columns}
                    data={detectedIncidents}
                    paginationConfig={pagination}
                />
            </Card>
        </div>
    )
}

export default DetectedIncidents;