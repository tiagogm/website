import React from "react";
import Head from "next/head";

const seo = {
  ogUrl: "https://tmorais.dev",
  twitterSite: "@_tiagogm",
};

export interface ISEOProps {
  title?: string;
  description?: string;
}

export const HeadContainer: React.SFC<ISEOProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={title} property="og:title" />
      <meta content={title} property="og:site_name" />
      <meta content="product" property="og:type" />
      <meta content={seo.ogUrl} property="og:url" />
      <meta content={description} property="og:description" />

      <meta content={seo.twitterSite} name="twitter:site" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="cleartype" content="on" />
      <meta name="theme-color" content="#ffbb30" />

      <link rel="canonical" href={seo.ogUrl} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
