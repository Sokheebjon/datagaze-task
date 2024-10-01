import {ReactNode} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Controller, useFormContext} from "react-hook-form";
import {InputProps} from "@/components/ui/input.tsx";
import {Input as ShadInput} from "@/components/ui/input";

interface InputWithLabelProps extends InputProps {
    label: string;
    name: string;
    icon?: ReactNode
}

export function Input ({label, name, icon, ...props}: InputWithLabelProps){
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            {...props}
            render={({field, fieldState: { error }}) => (
                <div className="grid w-full relative items-center gap-1.5">
                    <Label className="text-lg" htmlFor={name}>{label}</Label>
                    {icon && <div className="absolute top-10 left-2">
                        {icon}
                    </div>}
                    <ShadInput className="bg-white pl-8" {...props} {...field}/>
                    {Boolean(error) && <span className="text-red-700">{error?.message}</span>}
                </div>
            )}
        />
    )
}