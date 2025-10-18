import { Section, Typo } from "@/components/ui";
import { getYears, Winners } from "@/data/winners";

import Arcodian from "../arcodian";

import s from "./style.module.scss";

export default function WinnersList() {
  const years = getYears();

  return (
    <Section padding={32} gap={64}>
      <div className={s.container}>
        <Typo.Headline>역대 수상자</Typo.Headline>

        <div className={s.winners_list}>
          {years.map((year, index) => (
            <div key={year}>
              <Arcodian
                year={year}
                winners={Winners[year]}
                isFirstYear={index === 0}
              />
              {index < years.length - 1 && <div className={s.divider} />}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
