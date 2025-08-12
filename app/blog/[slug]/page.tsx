import { CustomMDX } from "@/components/CustomMDX";
import "./markdown.css"; // 引入 GitHub 风格 markdown 样式
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";

export default async function Post({ params }: { params: { slug: string } }) {
  const filename = `./posts/${params.slug}/index.mdx`;
  const content = await readFile(filename, "utf-8");
  let postComponents = {};
  try {
    postComponents = await import("@posts/" + params.slug + "/components.js");
  } catch (e: any) {
    if (!e || e.code !== "MODULE_NOT_FOUND") {
      throw e;
    }
  }
  const { data, content: mdxContent } = matter(content);
  return (
    <article className="font-mono w-full min-w-0">
      <h1>{data.title}</h1>
      <div className="text-[14px] text-tertiary mt-1">
        {typeof data.date === "string"
          ? data.date
          : new Date(data.date).toLocaleDateString()}
      </div>
      {/* 同时保留原有 markdown 类，增加 markdown-body 以激活 markdown.css */}
      <div className="markdown markdown-body mt-10 w-full overflow-hidden">
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
