import { Layout } from "../components/layout/Layout";
import { GetStaticProps } from "next";
import { fetchEntryBySlug } from "../services/contentService";
import { RichText } from "../components/content/RichText/RichText";

interface IAboutContent {
  title: string;
  content: string;
}
type IAboutPageProps = IAboutContent;

const AboutPage = ({ content, title }) => (
  <Layout space={0}>
    <Layout.Title>{title}</Layout.Title>
    <Layout.Main>
      <RichText content={content} />
    </Layout.Main>
    <Layout.LinkBack to="/" />
  </Layout>
);

export const getStaticProps: GetStaticProps<IAboutPageProps> = async ({ preview }) => {
  const content = await fetchEntryBySlug<IAboutContent>(preview, "staticPage", "about");
  return {
    props: {
      ...content?.data,
    },
  };
};

export default AboutPage;
