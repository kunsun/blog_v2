import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import createMDX from "@next/mdx";

export default async function Post({ params }: { params: { slug: string } }) {
  const content = await readFile(`./content/posts/${params.slug}.mdx`, "utf-8");
  const { data, content: mdxContent } = matter(content);
  console.log(data, mdxContent);
  return (
    <main className="font-mono">
      <h1>{data.title}</h1>
    </main>
  );
}

export async function generateStaticParams() {
  const entries = await readdir("./content/posts", { withFileTypes: true });
  const dirs = entries.map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}
