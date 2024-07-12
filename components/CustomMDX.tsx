import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkSmartpants from "remark-smartypants";
import rehypePrettyCode from "rehype-pretty-code";
import darkPlus from "tm-themes/themes/dark-plus.json";
import { remarkMdxEvalCodeBlock } from "./mdx.js";
import React from "react";

const components = {
  h1: (props: any) => {
    return <h1>{props.children}</h1>;
  },
  h2: (props: any) => {
    return <h2>{props.children}</h2>;
  },
  p: (props: any) => {
    return (
      <p className="text-[14px] text-neutral-100 dark:text-neutral-800 ">
        {props.children}
      </p>
    );
  },
  code: (props: any) => {
    return <code className="text-sm p-1">{props.children}</code>;
  },
};

export function CustomMDX({ filename, source, postComponents }: any) {
  return (
    <MDXRemote
      source={source}
      components={{ ...components, ...postComponents }}
      options={{
        mdxOptions: {
          useDynamicImport: true,
          remarkPlugins: [
            [remarkSmartpants],
            [remarkMdxEvalCodeBlock, filename] as any,
          ],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: darkPlus,
              },
            ] as any,
          ],
        },
      }}
    />
  );
}
