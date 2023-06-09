import { NavLink } from "@/components/ui/navlink";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { PropsWithChildren, Suspense } from "react";

type Props = {
    params: {
        teamId: string;
        id: string;
    };
};

export default async function TeamsLayout({
    children,
    params: { id, teamId },
}: PropsWithChildren<Props>) {
    const details = await api.leagues.team.details(id, teamId);

    return (
        <main className="container flex p-10 space-x-10">
            <aside className="w-80">
                <div className="space-y-6">
                    <Image
                        priority
                        src={details.logos[0].href}
                        alt={details.name}
                        width={75}
                        height={75}
                    />
                    <h3 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
                        {details.name}
                    </h3>

                    <Suspense fallback={<SkeletonLastGames />}>
                        <LastGames id={details.id} />
                    </Suspense>
                </div>
            </aside>
            <div className="flex-1">
                <Link
                    href={`/leagues/${id}`}
                    className="text-blue-500 hover:underline"
                >
                    Back to league
                </Link>
                <nav className="flex">
                    <NavLink href={`/leagues/${id}/teams/${teamId}`}>
                        Overview
                    </NavLink>
                    <NavLink href={`/leagues/${id}/teams/${teamId}/history`}>
                        History
                    </NavLink>
                </nav>
                <div className="py-10">{children}</div>
            </div>
        </main>
    );
}

async function LastGames({ id }: { id: string }) {
    const lastGames = await api.leagues.team.matches(id);
    return (
        <div className="space-y-3">
            <h2 className="text-2xl font-extrabold tracking-tight lg:text-2xl">
                Last games
            </h2>
            <div className="space-x-3 flex">
                {lastGames.map((game) => {
                    const isHomeWinner = game.result.home > game.result.away;
                    const isAwayWinner = game.result.home < game.result.away;
                    const isWin = game.playedHome ? isHomeWinner : isAwayWinner;
                    const isLose = game.playedHome
                        ? isAwayWinner
                        : isHomeWinner;
                    const isDraw = game.result.home === game.result.away;

                    return (
                        <div
                            key={game.id}
                            className={cn(
                                "flex flex-row w-10 h-10 rounded-full text-white font-bold items-center justify-center",
                                {
                                    "bg-green-400": isWin,
                                    "bg-red-400": isLose,
                                    "bg-orange-400": isDraw,
                                }
                            )}
                        >
                            {isWin && "W"}
                            {isLose && "L"}
                            {isDraw && "D"}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function SkeletonLastGames() {
    return (
        <div className="space-y-3">
            <Skeleton className="w-36 h-8"></Skeleton>
            <div className="flex space-x-3">
                {new Array(5).fill(0).map((_, i) => (
                    <Skeleton key={i} className="w-10 h-10 rounded-full" />
                ))}
            </div>
        </div>
    );
}
