import {Controller, useFormContext} from "react-hook-form";
import {MultiSelect as ShadMultiselect} from "@/components/ui/multi-select";

interface TMultiselectProps {
    name: string;
    placeholder?: string;
    options?: {label: string, value:string }[];
}

const MultiSelect = ({name, placeholder, options = [], ...props}: TMultiselectProps) => {
    const {control} = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            {...props}
            render={({field}) => {
                return (
                    <ShadMultiselect
                        {...field}
                        placeholder={placeholder}
                        options={options}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                    />
                )
            }}
        />
    )
}

export default MultiSelect;