"use client"

import * as React from "react"
import {CalendarIcon} from "@radix-ui/react-icons"
import {format} from "date-fns"
import {DateRange} from "react-day-picker"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Time} from "@internationalized/date"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {TimeField} from "@/components/DateTimeRangePicker/TimeField.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useTranslation} from "react-i18next";
import {useCallback, useState} from "react";
import {DEFAULT_DATE_PICKER_PERIOD} from "@/utils/constants.ts";

interface TTimeParams {
    hour: number
    millisecond: number
    minute: number
    second: number
}

interface TDateTimeRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
    onApply: (date: DateRange | undefined) => void
}

const formatDate = (value: string) => {
    // Remove any characters that are not numbers or slashes
    let formattedDate = value.replace(/[^0-9]/g, "");

    // Limit the length to 8 characters (DDMMYYYY)
    if (formattedDate.length > 8) {
        formattedDate = formattedDate.slice(0, 8);
    }

    // Extract day, month, and year parts
    let day = formattedDate.slice(0, 2);
    let month = formattedDate.slice(2, 4);
    const year = formattedDate.slice(4, 8);

    // Ensure day is between 01 and 31
    if (day && parseInt(day, 10) > 31) {
        day = "31"; // Cap the day at 31
    }

    // Ensure month is between 01 and 12
    if (month && parseInt(month, 10) > 12) {
        month = "12"; // Cap the month at 12
    }

    // Rebuild the date string with slashes
    let formattedValue = day;
    if (month) {
        formattedValue += "/" + month;
    }
    if (year) {
        formattedValue += "/" + year;
    }

    return formattedValue;
};

const DateTimeRangePicker = ({
                                 className,
                                 onApply,
                             }: TDateTimeRangePickerProps) => {
    const {t} = useTranslation()
    const [openPopOver, setOpenPopOver] = useState<boolean>(false)
    const [date, setDate] = useState<DateRange | undefined>(DEFAULT_DATE_PICKER_PERIOD);
    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string | undefined>(undefined);
    const defaultStartDate = format(date?.from as Date, "dd/MM/yyyy");
    const defaultEndDate = format(date?.to as Date, "dd/MM/yyyy");

    const handleCancel = useCallback(() => {
        setOpenPopOver(false)
    }, [])

    const handleApply = useCallback(() => {
        onApply(date)
        setOpenPopOver(false)
    }, [date])

    const handleOpenPopover = useCallback(() => {
        setOpenPopOver(true)
    }, [])

    const handleStartTimeChange = useCallback((time: TTimeParams) => {
        const newDate = new Date(date?.to?.setHours(time.hour, time.minute) as EpochTimeStamp)
        setDate(prevState => ({...prevState, from: newDate}) as DateRange)
    }, [date])

    const handleEndTimeChange = useCallback((time: TTimeParams) => {
        const newDate = new Date(date?.to?.setHours(time.hour, time.minute) as EpochTimeStamp)
        setDate(prevState => ({...prevState, to: newDate}) as DateRange)
    }, [date])

    const handleStartDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const formattedValue = formatDate(inputValue);
        setStartDate(formattedValue);
        if (inputValue.length === 10) {
            const seperatedDate = inputValue?.split("/");
            const newDate = new Date(
                date?.from?.setFullYear(parseInt(seperatedDate[2]),
                    parseInt(seperatedDate[1]) - 1,
                    parseInt(seperatedDate[0])) as EpochTimeStamp
            )
            setDate(prevState => ({...prevState, from: newDate}) as DateRange)
        }
    }, [date])

    const handleEndDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const formattedValue = formatDate(inputValue);
        setEndDate(formattedValue);
        if (inputValue.length === 10) {
            const seperatedDate = inputValue?.split("/");
            const newDate = new Date(
                date?.to?.setFullYear(parseInt(seperatedDate[2]),
                    parseInt(seperatedDate[1]) - 1,
                    parseInt(seperatedDate[0])) as EpochTimeStamp
            )
            setDate(prevState => ({...prevState, to: newDate}) as DateRange)
        }

    }, [date])

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={openPopOver}>
                <PopoverTrigger onClick={handleOpenPopover} asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {date?.from ? (
                            date?.to ? (
                                <>
                                    {format(date.from, "dd/MM hh:mm aa")} -{" "}
                                    {format(date.to, "dd/MM hh:mm aa")}
                                </>
                            ) : (
                                format(date.from, "dd/MM HH:MM")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        className="w-full"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                    />
                    <div className="mt-4">
                        <p className="text-black font-medium mb-3">{t("datepicker.start_date")}</p>
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                maxLength={10}
                                onChange={handleStartDateChange}
                                defaultValue={defaultStartDate}
                                value={startDate}
                            />
                            <div className="w-full">
                                <TimeField
                                    defaultValue={new Time(date?.from?.getHours(), date?.from?.getMinutes(), date?.from?.getSeconds())}
                                    onChange={handleStartTimeChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-black font-medium mb-3">{t("datepicker.end_date")}</p>
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                maxLength={10}
                                onChange={handleEndDateChange}
                                defaultValue={defaultEndDate}
                                value={endDate}
                            />
                            <div className="w-full">
                                <TimeField
                                    defaultValue={new Time(date?.to?.getHours(), date?.to?.getMinutes(), date?.to?.getSeconds())}
                                    onChange={handleEndTimeChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 gap-3">
                        <Button onClick={handleCancel} variant="outline"
                                className="w-full">{t("button.cancel")}</Button>
                        <Button
                            variant="ghost"
                            className="bg-neutral-800 text-white w-full"
                            onClick={handleApply}
                        >
                            {t("button.apply")}
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DateTimeRangePicker;