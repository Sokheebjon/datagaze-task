"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell, TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Select from "@/components/Select/Select";
import {useTranslation} from "react-i18next";
import Paginator from "@/components/Paginator";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    loading?: boolean;
    paginationConfig: {
        page: number;
        limit: number;
        pages: number;
        total: number;
        onPageChange: (page: number) => void;
        onPerPageChange: (perPage: number) => void;
    }
}

const PAGE_SIZE_OPTIONS = [
    {value: "10", label: "10"},
    {value: "50", label: "50"},
    {value: "100", label: "100"},
    {value: "300", label: "300"},
]

export function DataTable<TData, TValue>({
                                             columns,
                                             loading,
                                             data,
                                             paginationConfig
                                         }: DataTableProps<TData, TValue>) {
    const {t} = useTranslation()
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    })

    return (
        <div className="rounded-md px-1">
            <Table className="data-table">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                {t("loading")}
                            </TableCell>
                        </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={columns.length}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <span className="mr-2">{t("table.rows_per_page")}:</span>
                                    <div className="w-16">
                                        <Select
                                            defaultValue={PAGE_SIZE_OPTIONS[0]?.value}
                                            options={PAGE_SIZE_OPTIONS}
                                            onValueChange={(value) => paginationConfig.onPerPageChange(+value)}
                                        />
                                    </div>
                                </div>
                                <p>
                                    {t("table.total_data")}: {paginationConfig.total}
                                </p>
                                <div>
                                    <Paginator
                                        currentPage={paginationConfig.page}
                                        totalPages={paginationConfig.pages}
                                        onPageChange={paginationConfig.onPageChange}
                                        showPreviousNext
                                    />
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
