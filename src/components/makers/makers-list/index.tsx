import { Section, Typo } from "@/components/ui";
import { getMakerYears, ProblemSetters } from "@/data/makers";

import Maker from "../maker";

import s from "./style.module.scss";

export default function MakersList() {
  const years = getMakerYears();

  return (
    <Section padding={32} gap={64}>
      <div className={s.container}>
        <Typo.Headline>문제 출제자</Typo.Headline>

        <div className={s.makers_list}>
          {years.map((year) => (
            <div key={year} className={s.year_section}>
              <Typo.Headline className={s.year_title}>{year}</Typo.Headline>
              <div className={s.cards_grid}>
                {ProblemSetters[year].map((maker, index) => (
                  <Maker key={index} maker={maker} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
