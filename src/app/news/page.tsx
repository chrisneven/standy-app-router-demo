import { H1, H4, P } from "@/components/ui/tg";
import cms from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
    const { articles } = await cms.Articles();
    return (
        <main className="p-10 container">
            <H1>Latest News</H1>
            <div className="space-y-10 mt-10">
                {articles.map((article) => (
                    <Link
                        className="space-x-5 flex"
                        href={`/news/${article.slug}`}
                        key={article.id}
                    >
                        {article.image && (
                            <Image
                                className="object-cover"
                                src={article.image.url}
                                alt={article.title}
                                width={500}
                                height={300}
                            />
                        )}
                        <div>
                            <H4 className="text-2xl font-bold">
                                {article.title}
                            </H4>
                            <P className="line-clamp-4 ">{article.content}</P>
                            <span className="text-blue-500">Read More</span>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
