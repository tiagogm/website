import { Layout } from "@/components/layout/Layout";
import { Spacer } from "@/components/layout/Spacer";
import { SocialLinks } from "@/components/home/SocialLinks";
import { SiteLinks } from "@/components/home/SiteLinks";
import { MyPhoto } from "@/components/home/MyPhoto";
import { fetchEntryBySlug } from "@/services/contentService";
import { GetStaticProps } from "next";

interface IHomePageContent {
  title: string;
  picture: {
    title: string;
    file: {
      url: string;
    };
  };
}

type IHomePageProps = IHomePageContent;

const HomePage: React.FC<IHomePageProps> = ({ picture, title }) => (
  <Layout>
    <Layout.Main>
      <Spacer size={80} />
      <MyPhoto size={80} url={`https:${picture.file.url}`} alt={picture.title} />
      <Spacer size={48} />
      <div>
        <h1 className="text-center">{title}</h1>
        <hr />
        <SiteLinks />
        <Spacer size={72} />
        <SocialLinks />
      </div>
    </Layout.Main>
  </Layout>
);

export const getStaticProps: GetStaticProps<IHomePageProps> = async ({ preview }) => {
  //todo: merge staticPage with homePage, or remove slug
  const content = await fetchEntryBySlug<IHomePageContent>(preview, "homePage", "homepage");

  // console.log(`getStaticProps`, content)
  return {
    props: {
      ...content?.data,
    },
  };
};

export default HomePage;
