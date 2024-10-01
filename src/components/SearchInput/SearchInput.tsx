import {FC} from "react";
import {Input as ShadInput, InputProps} from "@/components/ui/input.tsx";
import {SearchIcon} from "@/assets/icons";
import {cn} from "@/lib/utils.ts";

interface TSearchInputProps extends InputProps {}

const SearchInput:FC<TSearchInputProps> = ({className,...props}) => {

    return (
        <div className="grid w-full relative items-center gap-1.5">
             <div className="absolute left-2">
                <SearchIcon/>
            </div>
            <ShadInput className={cn('bg-white pl-8', className)} {...props} />
        </div>
    )
}

export default SearchInput;