import { Spacer } from "@/components/layout/Spacer";
import { SocialLinks } from "@/components/home/SocialLinks";
import { SiteLinks } from "@/components/home/SiteLinks";
import { MyPhoto } from "@/components/home/MyPhoto";
import { AppLayout } from "../components/layout/AppLayout";
import { fetchEntryBySlug } from "@/services/contentService";

interface IHomePageContent {
  title: string;
  picture: {
    title: string;
    file: {
      url: string;
    };
  };
}

export default async function HomePage() {
  const content = await fetchEntryBySlug<IHomePageContent>(false, "homePage", "homepage");
  const { title, picture } = content?.data || {};

  return (
    <AppLayout>
      <AppLayout.Main>
        <Spacer size={80} />
        <MyPhoto size={100} url={`https:${picture.file.url}`} alt={picture.title} />
        <Spacer size={48} />
        <div>
          <h1 className="text-center">{title}</h1>
          <hr />
          <SiteLinks />
          <Spacer size={72} />
          <SocialLinks />
        </div>
      </AppLayout.Main>
    </AppLayout>
  );
}
