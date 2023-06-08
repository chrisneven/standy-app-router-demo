import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const data = await api.leagues.list();
    return (
        <main className="container p-10">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                All leagues
            </h1>
            <div className="grid grid-cols1 sm:grid-cols-2 lg:grid-cols-4 gap-4 [&:not(:first-child)]:mt-6">
                {data.map((league) => (
                    <Link key={league.id} href={`/leagues/${league.id}`}>
                        <Card className="h-full hover:border-gray-300">
                            <CardHeader className="items-center text-center">
                                <Image
                                    src={league.logos.light}
                                    alt={league.name}
                                    width={100}
                                    height={100}
                                />
                                <CardTitle>{league.name}</CardTitle>
                                <CardDescription>{league.abbr}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </main>
    );
}
