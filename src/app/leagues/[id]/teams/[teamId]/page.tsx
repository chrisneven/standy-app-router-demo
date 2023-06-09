import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import Image from "next/image";
import { Suspense } from "react";

type Props = {
    params: {
        teamId: string;
        id: string;
    };
};

export default async function Page({ params: { teamId, id } }: Props) {
    const playerPromise = api.leagues.team.players(id);
    const details = await api.leagues.team.details(id, teamId);

    return (
        <div className="space-y-10">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Team overview
            </h1>
            <Suspense fallback={<SkeletonPlayers />}>
                <Players playerPromise={playerPromise} />
            </Suspense>
        </div>
    );
}

async function Players({
    playerPromise,
}: {
    playerPromise: ReturnType<typeof api.leagues.team.players>;
}) {
    const players = await playerPromise;
    return (
        <div className="grid grid-cols-3 gap-4">
            {players.map((player, index) => (
                <Card
                    key={player.id}
                    className="h-full hover:border-gray-300 overflow-hidden"
                >
                    <div className="relative aspect-square w-full ">
                        <Image
                            priority={index < 3}
                            sizes="(min-width: 1024px) 20vw, 100vw"
                            fill
                            src={player.image}
                            alt={player.name}
                            className="object-cover"
                        />
                    </div>
                    <CardHeader className="items-center text-center">
                        <CardTitle>{player.name}</CardTitle>
                        <CardDescription>{player.position}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}

function SkeletonPlayers() {
    return (
        <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-full hover:border-gray-300">
                    <Skeleton className="relative aspect-square w-full "></Skeleton>
                    <CardHeader className="items-center text-center">
                        <Skeleton className="w-36 h-8" />
                        <Skeleton className="w-20 h-8" />
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
