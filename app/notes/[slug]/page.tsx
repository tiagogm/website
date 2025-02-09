import { notFound } from "next/navigation";
import { Metadata } from "next";
import blogService from "@/services/blogService";
import { markdownUtils } from "@/utils/markdown";
import { DateUtils } from "@/utils/date";
import { AppLayout } from "@/components/layout/AppLayout";

export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await blogService.fetchArticles();
  return articles.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const article = await blogService.fetchArticleBySlug(slug);

  if (!article) {
    return {
      title: "Not Found",
      robots: "noindex",
    };
  }

  return {
    title: article.title,
  };
}

/**
 * dangerouslySetInnerHTML is not ideal, improve later
 */
const RenderMarkdown = ({ content }: { content: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: markdownUtils.parseToHTML(content) }}></div>;
};

export default async function NotePage({ params }: Props) {
  const slug = (await params).slug;
  const article = await blogService.fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { title, body, publishDate } = article;

  return (
    <AppLayout space={0}>
      <AppLayout.Title space={8}>{title}</AppLayout.Title>
      <AppLayout.Subtitle space={40}>{DateUtils.IsoToStr(publishDate)}</AppLayout.Subtitle>
      <AppLayout.Main>
        <RenderMarkdown content={body} />
      </AppLayout.Main>
      <AppLayout.LinkBack to="/notes" />
    </AppLayout>
  );
}
