import { ProblemSetter } from "@/data/makers";

import s from "./style.module.scss";
import { Typo } from "@/components/ui";

interface MakerProps {
  maker: ProblemSetter;
}

export default function Maker({ maker }: MakerProps) {
  return (
    <div className={s.card}>
      <Typo.BodyLarge>{maker.name}</Typo.BodyLarge>
      <Typo.Body className={s.role}>{maker.role}</Typo.Body>
    </div>
  );
}
