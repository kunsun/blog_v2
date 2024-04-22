import { getBlogPostList } from "@/db/blogs";
import Link from "@/components/Link";

export default function Post() {
  const posts = getBlogPostList();

  return (
    <main className="font-mono px-5 pb-20">
      <div className="mt-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            className="block py-[12px] hover:scale-[1.005]"
            href={"/blog/" + post.slug + "/"}
          >
            <article key={post.slug} className="group my-4">
              <h2 className="group-hover:underline font-extrabold">
                {post.metadata.title}
              </h2>
              <div className="text-[13px] text-tertiary mt-1">
                {post.metadata.date}
              </div>
              <div className="text-[14px] text-subtitle  mt-1]">
                {post.metadata.description || "这是一段描述一段描述"}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}

const PostTitle = () => {};
