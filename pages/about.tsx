import { Layout } from "../components/layout/Layout";

const AboutPage = () => (
  <Layout space={0}>
    <Layout.Title>About me</Layout.Title>
    <Layout.Main>
      <p>My name is Tiago Morais.</p>
      <p>
        I'm 27, born in sunny Lisbon and I've been living and working in busy London for the past 5 years. I've been playing around with computer
        since I was little and have been writing software professionally since 2010.
      </p>
      <p>
        I've worked with .net and specially Javascript my entire career. I have experience leading teams, hiring and planning, but my main focus is
        technical excellence.
        <br />
        Over the past few years I've specialliased in the web, but I have a special interest in Scalability, User Experience and Design Systems.
      </p>
    </Layout.Main>
    <Layout.LinkBack to="/" />
  </Layout>
);

export default AboutPage;
