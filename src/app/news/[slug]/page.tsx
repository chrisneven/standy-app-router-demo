import { H1, H4 } from "@/components/ui/tg";
import cms from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";

type Props = {
    params: {
        slug: string;
    };
};
export default async function Page({ params: { slug } }: Props) {
    const { article } = await cms.Article({ slug });

    if (!article) {
        throw new Error("Article not found");
    }

    return (
        <main className="container p-10 space-y-10">
            <Link href="/news" className="text-blue-500">
                Back to News
            </Link>
            <div className="relative aspect-video">
                {article.image && (
                    <Image
                        priority
                        fill
                        className="object-cover"
                        src={article.image.url}
                        alt={article.title}
                        sizes="100vw"
                    />
                )}
            </div>
            <H1>{article.title}</H1>
            <ReactMarkdown
                components={{
                    h4: H4 as HeadingComponent,
                }}
            >
                {article.content}
            </ReactMarkdown>
        </main>
    );
}

export async function generateStaticParams() {
    const { articles } = await cms.Articles();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}
