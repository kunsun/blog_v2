import { CustomMDX } from "@/components/CustomMDX";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";

export default async function Post({ params }: { params: { slug: string } }) {
  const filename = `./posts/${params.slug}/index.mdx`;
  const content = await readFile(filename, "utf-8");
  let postComponents = {};
  try {
    postComponents = await import("@posts/" + params.slug + "/components.js");
  } catch (e) {
    if (!e || e.code !== "MODULE_NOT_FOUND") {
      throw e;
    }
  }
  console.log(postComponents);
  const { data, content: mdxContent } = matter(content);
  return (
    <article className="font-mono">
      <h1>{data.title}</h1>
      <div className="text-[14px] text-tertiary mt-1">{data.date}</div>
      <div className="markdown markdown-body mt-10">
        <CustomMDX
          source={mdxContent}
          filename={filename}
          postComponents={postComponents}
        />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const entries = await readdir("./posts", { withFileTypes: true });
  const dirs = entries.map((entry) => entry.name.replace(/\.mdx$/, ""));
  return dirs.map((dir) => ({
    slug: dir,
  }));
}
