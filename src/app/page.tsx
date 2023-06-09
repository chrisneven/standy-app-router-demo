import { H1, P } from "@/components/ui/tg";

export default async function Home() {
    return (
        <main className="container p-10">
            <H1>Standy</H1>
            <P>
                Welcome to Standy, a website for football fans to keep up to
                date with the latest news and scores.
                <br />
                <br />
                This website is built using Next.js, Tailwind CSS, and a
                Football Data API.
            </P>
        </main>
    );
}
