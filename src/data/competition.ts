import { File, Flag } from "lucide-react";

export const Competition = [
  {
    icon: File,
    title: "대회 신청",
    startDate: new Date("2025-10-22T00:00:00").getTime(),
    endDate: new Date("2025-11-12T23:59:59").getTime(),
    description: "대회 참가 신청이 정상적으로 완료된 경우, 이메일로 확인 메일이 발송됩니다. ",
    eligibility: [
      {
        name: "중등부",
        value: "만 13세 ~ 만 15세",
      },
      {
        name: "고등부",
        value: "만 16세 ~ 만 18세",
      },
      {
        name: "일반부",
        value: "만 19세 이상",
      },
    ],
  },
  {
    icon: Flag,
    title: "CTF 대회",
    startDate: new Date("2025-11-15T10:00:00").getTime(),
    endDate: new Date("2025-11-16T10:00:00").getTime(),
    description: "디스코드 서버 참가 필수",
    eligibility: [
      {
        name: "대회 장소",
        value: "온라인",
      },
      {
        name: "진행 방식",
        value: "문제풀이(Jeopardy)",
      },
    ],
    preparation: ["노트북 또는 PC", "장소", "초코파이"],
  },
];
