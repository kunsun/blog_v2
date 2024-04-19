import path from "path";
import fs from "fs";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "content/posts");

export function getBlogPostList() {
  const posts = fs
    .readdirSync(POSTS_PATH)
    .filter(
      (filename) => /\.mdx?$/.test(filename) && !filename.startsWith("draft_")
    )
    .map((fileName) => {
      const content = fs.readFileSync(path.join(POSTS_PATH, fileName), "utf8");
      const slug = fileName.replace(/\.mdx?$/, "");
      const { data } = matter(content);
      return {
        metadata: data,
        slug,
      };
    });
  return posts;
}
