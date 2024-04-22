import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";

const components = {
  h1: (props: any) => {
    return <h1 className="text-4xl font-bold text-center">{props.children}</h1>;
  },
  h2: (props: any) => {
    return <h2>{props.children}</h2>;
  },
};

export function CustomMDX(props: any) {
  return <MDXRemote {...props} components={{ ...components }} />;
}
