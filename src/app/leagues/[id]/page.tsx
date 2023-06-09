import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

type Props = {
    params: {
        id: string;
    };
};

export default async function Page({ params: { id } }: Props) {
    const [details, { standings }] = await Promise.all([
        api.leagues.details(id),
        api.leagues.standings(id),
    ]);

    return (
        <main className="container p-10 space-y-10">
            <Link href="/leagues" className="text-blue-500 hover:underline">
                Back to leagues
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {details.name}
            </h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>GP</TableHead>
                        <TableHead>W</TableHead>
                        <TableHead>L</TableHead>
                        <TableHead>D</TableHead>
                        <TableHead>PTS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {standings.map((standing, i) => (
                        <TableRow key={standing.team.id} className="relative">
                            <TableCell>
                                <Link
                                    className="absolute inset-0"
                                    href={`/leagues/${id}/teams/${standing.team.id}`}
                                />
                                {i + 1}
                            </TableCell>
                            <TableCell className="flex gap-2 align-center">
                                <Image
                                    src={standing.team.logos?.[0].href}
                                    alt={standing.team.name}
                                    width={25}
                                    height={25}
                                />
                                {standing.team.name}
                            </TableCell>
                            <TableCell>
                                {
                                    standing.stats.find(
                                        (stat) => stat.name === "gamesPlayed"
                                    )?.value
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    standing.stats.find(
                                        (stat) => stat.name === "wins"
                                    )?.value
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    standing.stats.find(
                                        (stat) => stat.name === "losses"
                                    )?.value
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    standing.stats.find(
                                        (stat) => stat.name === "ties"
                                    )?.value
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    standing.stats.find(
                                        (stat) => stat.name === "points"
                                    )?.value
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
}

export async function generateMetadata({ params }: Props) {
    const data = await api.leagues.details(params.id);

    return {
        title: "League - " + data.name,
        description: data.abbr,
    };
}

export async function generateStaticParams() {
    const data = await api.leagues.list();
    return data.map((league) => ({
        id: league.id,
    }));
}
