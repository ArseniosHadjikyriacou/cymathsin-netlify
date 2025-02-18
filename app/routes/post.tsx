import { Link } from "react-router";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "@portabletext/react";
import type { Route } from "../routes/+types/post";
import { client } from "~/sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

export async function loader({ params }: Route.LoaderArgs) {
  return { post: await client.fetch<SanityDocument>(POST_QUERY, params) };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main>
      <Link to="/">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          width="550"
          height="310"
        />
      )}
      <h1>{post.title}</h1>
      <div>
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}