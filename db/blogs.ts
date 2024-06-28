import path from "path";
import fs from "fs";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "/posts");

export function getBlogPostList() {
  const dirs = fs
    .readdirSync(POSTS_PATH, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  const fileContents = dirs.map((dir) => {
    return fs.readFileSync(path.join(POSTS_PATH, dir, "index.mdx"), "utf8");
  });

  const posts = dirs.map((slug, i) => {
    const fileContent = fileContents[i];
    const { data } = matter(fileContent);
    return { metadata: data, date: data.date, slug };
  });

  posts.sort((a, b) => {
    return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1;
  });
  return posts;
}
