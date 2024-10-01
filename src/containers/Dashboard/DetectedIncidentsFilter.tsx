import {FC, useCallback, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {ActionEnum, serverityEnum} from "@/hooks/query/useDetectedIncidentsQuery.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FilterIcon} from "@/assets/icons";
import get from "lodash/get";
import {FormProvider, useForm} from "react-hook-form";
import {Form} from "@/containers";
import {TDoctype, useDocTypeQuery} from "@/hooks/query/useDocTypeQuery.ts";
import {TChannel, useChannelQuery} from "@/hooks/query/useChannelQuery.ts";

export type TNames = "serverity" | "action" | "doctype" | "channel";

export interface TFiltersType {
    serverity: serverityEnum[];
    action: ActionEnum[];
    docType: string[];
    channel: string[];
}

interface TDetectedIncidentsFilterProps {
    setFilter: (filter: TFiltersType) => void;
    filter: TFiltersType
}

interface TFields {
    serverity: serverityEnum[];
    action: ActionEnum[];
    docType: string[];
    channel: string[];
}

const DetectedIncidentsFilter: FC<TDetectedIncidentsFilterProps> = ({filter, setFilter}) => {
    const {t} = useTranslation()
    const [open, setOpen] = useState(false);
    const methods = useForm<TFields>({
        defaultValues: {
            ...filter
        }
    })
    const doctypeQuery = useDocTypeQuery({staleTime: 600000});
    const channelQuery = useChannelQuery({staleTime: 600000});
    const documentTypeList = get(doctypeQuery, "data.data", []) as TDoctype[];
    const channelEnums = get(channelQuery, "data.data", {}) as TChannel;

    const docTypeOptions = documentTypeList.map((docType) => ({
        value: docType.id,
        label: docType.name
    }))
    const channelOptions = Object.keys(channelEnums).map((channelKey) => ({
        value: channelKey,
        label: channelKey
    }))
    const serverityOptions = useMemo(() => [
        {
            value: serverityEnum.high,
            label: t("status.high")
        },
        {
            value: serverityEnum.medium,
            label: t("status.medium")
        },
        {
            value: serverityEnum.low,
            label: t("status.low")
        },
    ], [t]);
    const actionOptions = useMemo(() => [
        {
            value: ActionEnum.block,
            label: t("actions.block")
        },
        {
            value: ActionEnum.warn,
            label: t("actions.warn")
        },
    ], [t]);

    const handleCancel = useCallback(() => setOpen(false), [])
    const handleOpen = useCallback(() => setOpen(true), [])

    const onSubmit = (values: TFields) => {
        setFilter(values)
        setOpen(false)
    }

    return (
        <Popover open={open}>
            <PopoverTrigger>
                <Button onClick={handleOpen} className="flex items-center gap-1" variant="outline">
                    <FilterIcon/> {t("button.filter")}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <Form.MultiSelect
                                options={serverityOptions}
                                name="serverity"
                                placeholder={t("placeholder.serverity")}
                            />
                            <Form.MultiSelect
                                options={actionOptions}
                                name="action"
                                placeholder={t("placeholder.action_type")}
                            />
                            <Form.MultiSelect
                                options={docTypeOptions}
                                name="doctype"
                                placeholder={t("placeholder.document_type")}
                            />
                            <Form.MultiSelect
                                options={channelOptions}
                                name="channel"
                                placeholder={t("placeholder.channel")}
                            />
                        </div>
                        <div className="flex justify-between items-center gap-2 mt-2">
                            <Button onClick={handleCancel} className="w-full"
                                    variant="outline">{t("button.cancel")}</Button>
                            <Button
                                className="bg-neutral-800 text-white w-full"
                                type="submit"
                            >
                                {t("button.apply")}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </PopoverContent>
        </Popover>
    )
}

export default DetectedIncidentsFilter;