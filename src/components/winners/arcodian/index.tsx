import { ChevronUp } from "lucide-react";
import { useState } from "react";

import { Typo } from "@/components/ui";
import { getDivisionName, YearWinners } from "@/data/winners";

import s from "./style.module.scss";

interface ArcodianProps {
  year: string;
  winners: YearWinners;
  isFirstYear?: boolean;
}

export default function Arcodian({
  year,
  winners,
  isFirstYear = false,
}: ArcodianProps) {
  const [isExpanded, setIsExpanded] = useState(isFirstYear);

  const renderDivision = (division: keyof YearWinners) => {
    const divisionWinners = winners[division];
    return (
      <div key={division} className={s.division}>
        <div className={s.winners}>
          <div className={s.winner}>
            <Typo.Body className={s.division_title}>
              {getDivisionName(division)} 1위
            </Typo.Body>
            <Typo.BodyLarge>{divisionWinners.first.name}</Typo.BodyLarge>
          </div>
          <div className={s.winner}>
            <Typo.Body className={s.division_title}>
              {getDivisionName(division)} 2위
            </Typo.Body>
            <Typo.BodyLarge>{divisionWinners.second.name}</Typo.BodyLarge>
          </div>
          <div className={s.winner}>
            <Typo.Body className={s.division_title}>
              {getDivisionName(division)} 3위
            </Typo.Body>
            <Typo.BodyLarge>{divisionWinners.third.name}</Typo.BodyLarge>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={s.arcodian}>
      <div className={s.header} onClick={() => setIsExpanded(!isExpanded)}>
        <Typo.Headline className={s.title}>{year} 수상자</Typo.Headline>
        <button className={s.icon_button}>
          <ChevronUp
            className={s.icon}
            size={20}
            style={{
              transform: isExpanded ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </button>
      </div>

      {isExpanded && (
        <div className={s.content}>
          <div className={s.divisions}>
            {renderDivision("adult")}
            {renderDivision("highSchool")}
            {renderDivision("middleSchool")}
          </div>
        </div>
      )}
    </div>
  );
}
