import { Layout } from "../components/layout/Layout";
import { Spacer } from "../components/layout/Spacer";
import { SocialLinks } from "../components/home/SocialLinks";
import { SiteLinks } from "../components/home/SiteLinks";
import { MyPhoto } from "../components/home/MyPhoto";

const HomePage = () => (
  <Layout>
    <Layout.Main>
      <MyPhoto size={80} path="/img/profile/profile2" alt="Tiago Morais" />
      <Spacer size={48} />
      <div>
        <h1 className="text-center">Tiago Morais</h1>
        <hr />
        <SiteLinks />
        <Spacer size={128} />
        <SocialLinks />
      </div>
    </Layout.Main>
  </Layout>
);

export default HomePage;
