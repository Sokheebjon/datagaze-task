import {FC} from "react";
import {Progress} from "@/components/ui/progress.tsx";
import {ProgressProps} from "@radix-ui/react-progress";

interface TProgressChart extends ProgressProps {
    value: number;
    label: string;
    prefix?: string;
}

const ProgressChart:FC<TProgressChart> = ({label, value,prefix, ...props}) => {


    return (
            <div className="flex flex-col justify-between items-center mb-4">
                <div className="flex justify-between w-full mb-1">
                    <p className="text-sm text-gray-500 font-medium">{label}</p>
                    <p className="text-sm text-gray-500 font-medium">{value} {prefix}</p>
                </div>
                <Progress className="h-3 progress-bar" {...props} value={value} />
            </div>
    )
}

export default ProgressChart;