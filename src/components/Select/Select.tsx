import {Select as ShadSelect, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {FC} from "react";
import {SelectProps} from "@radix-ui/react-select";
import {useTranslation} from "react-i18next";

interface TOptions {
    value: string
    label: string
}

interface TSelectProps extends SelectProps {
    options: TOptions[],
    placeholder?: string,
    loading?: boolean
}

const Select: FC<TSelectProps> = ({options, placeholder, loading, ...props}) => {
    const {t} = useTranslation()

    return (
        <ShadSelect {...props}>
            <SelectTrigger className="rounded-xl">
                <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent>
                {
                    loading
                        ? <SelectItem value="loading" disabled>{t("loading")}</SelectItem>
                        : options.map((option, index) => (
                            <SelectItem key={index} value={option.value}>{option.label}</SelectItem>))
                }
            </SelectContent>
        </ShadSelect>
    )
}

export default Select;