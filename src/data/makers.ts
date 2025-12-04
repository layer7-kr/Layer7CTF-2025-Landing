export interface ProblemSetter {
  name: string;
  role: string;
}

// 문제 출제자 데이터
export const ProblemSetters: { [year: string]: ProblemSetter[] } = {
  "2025": [
    { name: "문시우", role: "Layer7 17기 부장" },
    { name: "안건희", role: "Layer7 17기 부부장" },
    { name: "권민성", role: "Layer7 17기" },
    { name: "정경빈", role: "Layer7 17기" },
    { name: "김현식", role: "Layer7 20기 부장" },
    { name: "맹서현", role: "Layer7 22기 부부장" },
    { name: "가세혁", role: "Layer7 23기 부장" },
    { name: "김승중", role: "Layer7 23기 부부장" },
    { name: "이동건", role: "Layer7 24기 부장" },
    { name: "장재영", role: "Layer7 24기 부부장" },
    { name: "정건우", role: "Layer7 24기" },
    { name: "유승주", role: "Layer7 25기" },
    { name: "김세중", role: "Layer7 25기" },
    { name: "김지후", role: "Layer7 25기" },
    { name: "이재영", role: "Emotion 7기" },
    { name: "김우진", role: "TeamLog 11기" },

  ],
  // "2024": [
  //   { name: "이동건", role: "Layer7 24기 부장" },
  //   { name: "김도현", role: "Layer7 23기" },
  //   { name: "박서준", role: "Layer7 22기" },
  //   { name: "이예린", role: "Layer7 21기" },
  //   { name: "최민석", role: "Layer7 20기" },
  //   { name: "정유진", role: "Layer7 19기" },
  //   { name: "한지훈", role: "Layer7 18기" },
  //   { name: "강나연", role: "Layer7 17기" },
  //   { name: "윤태현", role: "Layer7 16기" },
  //   { name: "조수빈", role: "Layer7 15기" },
  // ],
  // "2023": [
  //   { name: "이동건", role: "Layer7 23기 부장" },
  //   { name: "김지호", role: "Layer7 22기" },
  //   { name: "박민지", role: "Layer7 21기" },
  //   { name: "이준서", role: "Layer7 20기" },
  //   { name: "최하늘", role: "Layer7 19기" },
  //   { name: "정태우", role: "Layer7 18기" },
  //   { name: "한소미", role: "Layer7 17기" },
  //   { name: "강민규", role: "Layer7 16기" },
  //   { name: "윤서아", role: "Layer7 15기" },
  // ],
};

export function getMakerYears() {
  return Object.keys(ProblemSetters).sort((a, b) => b.localeCompare(a));
}
