import { getBlogPostList } from "@/db/blogs";
import Link from "@/components/Link";

export default function Post() {
  const posts = getBlogPostList();

  return (
    <main className="font-mono">
      it is a page 1234567890
      这是一段常常的文字种豆得豆活动活动的好多好多好多好多好多好多的活动
      {posts.map((post) => (
        <Link
          key={post.slug}
          className="block py-4 hover:scale-[1.005]"
          href={"/blog/" + post.slug + "/"}
        >
          <article key={post.slug}>
            <h2>{post.slug}</h2>
            <p>{post.metadata.date}</p>
          </article>
        </Link>
      ))}
    </main>
  );
}

const PostTitle = () => {};
