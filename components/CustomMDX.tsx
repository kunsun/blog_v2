import { MDXRemote } from "next-mdx-remote/rsc";
import remarkSmartpants from "remark-smartypants";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import darkPlus from "tm-themes/themes/dark-plus.json";
import { remarkMdxEvalCodeBlock } from "./mdx.js";
import React from "react";
import overnight from "overnight/themes/Overnight-Slumber.json";
import { Tag } from "./Tag";

const components = {
  Tag,
};

export function CustomMDX({ filename, source, postComponents }: any) {
  const theme = { dark: darkPlus, light: overnight } as any;
  return (
    <MDXRemote
      source={source}
      components={{ ...components, ...postComponents }}
      options={{
        mdxOptions: {
          useDynamicImport: true,
          remarkPlugins: [
            remarkSmartpants,
            remarkGfm,
            [remarkMdxEvalCodeBlock, filename] as any,
          ],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme,
              },
            ] as any,
          ],
        },
      }}
    />
  );
}
