import { FlexAlign } from "../stack";

import s from "./style.module.scss";

interface Props {
  children: React.ReactNode;
  padding?: number;
  gap?: number;
  align?: FlexAlign;
  className?: string;
  id?: string;
}

export default function Section({
  children,
  padding,
  gap = 48,
  align,
  className,
  id,
}: Props) {
  return (
    <section
      className={`${s.container} ${className}`}
      id={id}
      style={{ paddingBlock: padding, gap, alignItems: align }}
    >
      {children}
    </section>
  );
}
