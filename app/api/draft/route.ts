import blogService from "@/services/blogService";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // Parse query string parameters
  // const { searchParams } = new URL(request.url);
  // const secret = searchParams.get("secret");
  // const slug = searchParams.get("slug");

  // // Check the secret and next parameters
  // // This secret should only be known to this Route Handler and the CMS
  // if (secret !== "MY_SECRET_TOKEN" || !slug) {
  //   return new Response("Invalid token", { status: 401 });
  // }

  // // Fetch the headless CMS to check if the provided `slug` exists
  // // getPostBySlug would implement the required fetching logic to the headless CMS
  // const post = await blogService.fetchArticleBySlug(slug);

  // // If the slug doesn't exist prevent draft mode from being enabled
  // if (!post) {
  //   return new Response("Invalid slug", { status: 401 });
  // }

  // // Enable Draft Mode by setting the cookie
  // const draft = await draftMode();
  // draft.enable();

  // // Redirect to the path from the fetched post
  // // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  // redirect(post.slug);
  return new Response("Not implemented", { status: 501 });
}
