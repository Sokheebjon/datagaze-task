import {cn} from "@/lib/utils.ts";

export function PageHeader({
                               className,
                               ...props
                           }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1
            className={cn(
                "text-3xl leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]",
                className
            )}
            {...props}
        />
    )
}

export function PageHeaderSecondary({
                               className,
                               ...props
                           }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                "text-2xl leading-tight tracking-tighter lg:leading-[1.1]",
                className
            )}
            {...props}
        />
    )
}