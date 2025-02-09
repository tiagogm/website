import { fetchEntryBySlug } from "@/services/contentService";
import { RichText } from "@/components/content/RichText/RichText";
import { AppLayout } from "../../components/layout/AppLayout";

interface IAboutContent {
  title: string;
  content: string;
}
type IAboutPageProps = IAboutContent;

async function AboutPage() {
  const content = await fetchEntryBySlug<IAboutContent>(false, "staticPage", "about");
  const { title, content: richTextContent } = content?.data || {};

  return (
    <AppLayout>
      <AppLayout.Title>{title}</AppLayout.Title>
      <AppLayout.Main>
        <RichText content={richTextContent} />
      </AppLayout.Main>
      <AppLayout.LinkBack to="/" />
    </AppLayout>
  );
}

export default AboutPage;
