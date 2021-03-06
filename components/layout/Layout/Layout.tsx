import { HeadContainer } from "@/components/layout/HeadContainer";
import { LinkRainbow } from "@/components/layout/LinkRainbow";
import { Spacer, Scale } from "@/components/layout/Spacer";
import { Header } from "@/components/layout/Header";

import styles from "./Layout.module.scss";

interface ILayoutChildren {
  Main: typeof Main;
  Title: typeof Title;
  Subtitle: typeof SubTitle;
  LinkBack: typeof LinkBack;
  Skeleton: typeof Skeleton;
}

interface ILayoutSpaceProps {
  space?: Scale;
}

const LinkBack: React.FC<{ to: string }> = ({ to }) => (
  <LinkRainbow variation="b" to={to}>
    \> goto {to}
  </LinkRainbow>
);

const Title: React.FC<ILayoutSpaceProps> = ({ space, children }) => (
  <>
    <h1 className={styles.layout__title}>{children}</h1>
    {space && <Spacer size={space} />}
  </>
);

const SubTitle: React.FC<ILayoutSpaceProps> = ({ space, children }) => (
  <>
    <p className={styles.layout__subtitle}>{children}</p>
    {space && <Spacer size={space} />}
  </>
);

const Main: React.SFC<ILayoutSpaceProps> = ({ space = 64, children }) => {
  return (
    <>
      <main>{children}</main>
      <Spacer size={space} />
    </>
  );
};

const Skeleton: React.SFC<{ height: Scale }> = ({ height }) => {
  return <div className={styles.skeleton} style={{ height: height }}></div>;
};

type ILayoutProps = ILayoutSpaceProps & {
  headerLinkTo?: string;
};

export const Layout: React.FC<ILayoutProps> & ILayoutChildren = ({ headerLinkTo, children }) => (
  <div className={styles.layout}>
    <Header to={headerLinkTo} />
    <HeadContainer />
    {children}
  </div>
);

Layout.LinkBack = LinkBack;
Layout.Subtitle = SubTitle;
Layout.Main = Main;
Layout.Title = Title;
Layout.Skeleton = Skeleton;
