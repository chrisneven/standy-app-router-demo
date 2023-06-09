"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export function NavLink({
    href,
    children,
}: PropsWithChildren<{ href: string }>) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link href={href}>
            <div className={cn("p-6", isActive && "border-solid border-b-2")}>
                {children}
            </div>
        </Link>
    );
}
