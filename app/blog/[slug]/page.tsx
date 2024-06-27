import { CustomMDX } from "@/components/CustomMDX";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";

export default async function Post({ params }: { params: { slug: string } }) {
  const content = await readFile(
    `./content/posts/${decodeURIComponent(params.slug)}.mdx`,
    "utf-8"
  );
  const { data, content: mdxContent } = matter(content);
  return (
    <main className="font-mono">
      <h1>{data.title}</h1>
      <div className="text-[14px] text-tertiary mt-1">{data.date}</div>
      <div className="markdown mt-10">
        <CustomMDX source={mdxContent} />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const entries = await readdir("./content/posts", { withFileTypes: true });
  const dirs = entries.map((entry) => entry.name.replace(/\.mdx$/, ""));
  return dirs.map((dir) => ({ slug: encodeURIComponent(dir) }));
}
