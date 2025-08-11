import React from "react";

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag-badge">{children}</span>;
}
