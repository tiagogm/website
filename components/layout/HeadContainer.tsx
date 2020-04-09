import React from "react";
import Head from "next/head";
// Best practice is to have a typography module
// where you define your theme.
import { typography } from "../../utils/typography";

const seo = {
  title: "Tiago Morais // Software development thoughts and musings",
  ogUrl: "https://tiagogm.dev",
};

export interface ISEOProps {
  description?: string;
}

export const HeadContainer: React.SFC<ISEOProps> = ({ description }) => {
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

      <link rel="canonical" href={seo.ogUrl} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />

      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-39053104-1"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `  window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-39053104-1');`,
        }}
      />

      {/* todo: self host this for perf gains  */}
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:300,400,500|Merriweather:300,400,400i,700,700i&display=swap"
        rel="stylesheet"
        type="text/css"
      ></link>

      {/* react-typography not working, prob a nextjs incompat */}
      <style>{`${typography.toString()}`}</style>
    </Head>
  );
};
