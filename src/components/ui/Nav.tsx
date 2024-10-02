"use client";

import  {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Link, useLocation} from "react-router-dom";

interface NavProps {
    links: {
        title: string;
        label?: ReactNode | string;
        link: string;
        icon: () => JSX.Element;
        variant: string;
    }[];
}

export function Nav({links}: NavProps) {
    const {pathname} = useLocation();

    return (
        <div
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav
                className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    <Link
                        key={index}
                        to={link.link}
                        className={cn(
                            buttonVariants({variant: link.link === pathname ? "secondary" : "ghost"}),
                            link.variant === "secondary" &&
                            " dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                            "justify-start px-3 py-4 h-11",
                            link.link === pathname ? "bg-white shadow" : ""
                        )}
                    >
                        <div className="mr-2">
                            <link.icon/>
                        </div>
                        {link.title}
                        {link.label && (
                            <span
                                className={cn(
                                    "ml-auto",
                                    link.variant === "default" &&
                                    "text-background dark:text-white",
                                )}
                            >
                                {link.label}
                            </span>
                        )}
                    </Link>
                )}
            </nav>
        </div>
    );
}