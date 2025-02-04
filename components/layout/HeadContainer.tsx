import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// Best practice is to have a typography module
// where you define your theme.
import { typography } from "@/utils/typography";

const seo = {
  title: "Tiago Morais // Software development thoughts and notes",
  ogUrl: "https://tiagogm.dev",
  description: "My personal site and blog about software development thoughts and notes",
};

export interface ISEOProps {
  description?: string;
}

const getCannonical = (path: string) => {
  const qsIndx = path.indexOf("?") > -1 ? path.indexOf("?") : undefined;
  return `${seo.ogUrl}${path.slice(0, qsIndx)}`;
};

export const HeadContainer: React.FunctionComponent<ISEOProps> = ({ description = seo.description }) => {
  const { asPath } = useRouter();
  const canonicalUrl = getCannonical(asPath);

  return (
    <Head>
      <title>{seo.title}</title>
      <meta content={description} name="description" />
      <meta name="author" content="Tiago Morais" />
      <meta content={seo.title} property="og:title" />
      <meta content="website" property="og:type" />
      <meta property="og:locale" content="en_GB" />
      <meta content={seo.ogUrl} property="og:url" />
      <meta content={description} property="og:description" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@_tgmorais" />
      <meta name="twitter:site" content="@_tgmorais" />
      <meta name="twitter:url" content={seo.ogUrl} />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="cleartype" content="on" />
      {/* if we use css-in-js instead of css modules we can pull this from a theme.ts */}
      <meta name="theme-color" content="#03579e" />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />

      {/* react-typography not working, prob a nextjs incompat */}
      <style id="typography">{`${typography.toString()}`}</style>
    </Head>
  );
};
