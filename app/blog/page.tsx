import { getBlogPostList } from "@/db/blogs";
import Link from "@/components/Link";

export default function Post() {
  const posts = getBlogPostList();

  return (
    <main className="font-mono pb-20 w-full min-w-0">
      <div className="mt-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            className="block py-[12px] px-5 hover:scale-[1.005]"
            href={"/blog/" + decodeURIComponent(post.slug) + "/"}
          >
            <article key={post.slug} className="group my-2">
              <div className="group-hover:underline font-[600] text-[14px]">
                {post.metadata.title}
              </div>
              <div className="text-[13px] text-tertiary mt-1">
                {post.metadata.date}
              </div>
              <div className="text-[14px] text-subtitle mt-1">
                {post.metadata.description || ""}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
