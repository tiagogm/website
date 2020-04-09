// A simple example for testing it manually from your browser.
// If this is located at pages/api/preview.js, then

import { NextApiHandler } from "next";

// open /api/preview from your browser.
export default (({ query }, res) => {
  const { clear, url } = query;

  if (clear !== undefined) {
    res.writeHead(307, { Location: "/" });
    res.end();
    return;
  }

  // // Check the secret and next parameters
  // // This secret should only be known to this API route and the CMS
  // if (req.query.secret !== "MY_SECRET_TOKEN" || !req.query.slug) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const post = {
    slug: "es6",
  }; // await getPostBySlug(req.query.slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: url });
  res.end();
}) as NextApiHandler;
