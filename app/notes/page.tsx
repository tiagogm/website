import { AppLayout } from "@/components/layout/AppLayout";
import blogService from "@/services/blogService";
import { logService } from "@/services/logService";
import { ArticleLink } from "./components/ArticleLink";

export default async function NotesPage() {
  const articles = await blogService.fetchArticles();

  logService.log(`Blog.page - Fetched articles | items: ${articles?.length}`);

  return (
    <AppLayout>
      <AppLayout.Title space={64}>Notes on software</AppLayout.Title>
      <AppLayout.Main space={128}>
        {articles.map((article) => (
          <ArticleLink key={article.slug} {...article} />
        ))}
      </AppLayout.Main>
      <AppLayout.LinkBack to="/" />
    </AppLayout>
  );
}
