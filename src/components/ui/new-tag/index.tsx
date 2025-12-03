import React from "react";
import s from "./new-tag.module.scss";

interface NewTagProps {
  className?: string;
  children?: React.ReactNode;
}

export default function NewTag({ className, children }: NewTagProps) {
  return <span className={`${s.newTag} ${className ?? ""}`.trim()}>{children ?? "NEW"}</span>;
}


