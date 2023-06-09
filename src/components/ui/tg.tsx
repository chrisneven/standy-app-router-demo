import { cn } from "@/lib/utils";
import { ComponentProps, FC, PropsWithChildren } from "react";

export function P({
    className,
    ...props
}: PropsWithChildren<ComponentProps<"p">>) {
    return (
        <p
            className={cn(className, "leading-7 [&:not(:first-child)]:mt-6")}
            {...props}
        />
    );
}

type HeaderProps = PropsWithChildren<
    ComponentProps<"h1"> & {
        as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    }
>;
export function Header({ as, ...props }: HeaderProps) {
    const Component = as ?? "h1";
    return <Component {...props} />;
}

const classNameMap = [
    "text-4xl font-extrabold tracking-tight lg:text-5xl",
    "text-3xl font-extrabold tracking-tight lg:text-4xl",
    "text-2xl font-extrabold tracking-tight lg:text-3xl",
    "text-xl font-extrabold tracking-tight lg:text-2xl",
    "text-lg font-extrabold tracking-tight lg:text-xl",
    "text-base font-extrabold tracking-tight lg:text-lg",
] as const;
function createHeadingComponents() {
    return ([1, 2, 3, 4, 5, 6] as const).reduce((acc, i) => {
        acc[`H${i}`] = ({ className, ...props }: HeaderProps) => (
            <Header
                className={cn(className, classNameMap[i - 1])}
                {...props}
                as={`h${i}`}
            />
        );
        return acc;
    }, {} as Record<string, FC<HeaderProps>>);
}

export const { H1, H2, H3, H4, H5, H6 } = createHeadingComponents();
