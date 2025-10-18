export interface Winner {
  name: string;
  team?: string;
}

export interface DivisionWinners {
  first: Winner;
  second: Winner;
  third: Winner;
}

export interface YearWinners {
  adult: DivisionWinners;
  highSchool: DivisionWinners;
  middleSchool: DivisionWinners;
}

export interface WinnersData {
  [year: string]: YearWinners;
}

// 샘플 데이터
export const Winners: WinnersData = {
  // "2025": {
  //   adult: {
  //     first: { name: "???" },
  //     second: { name: "???" },
  //     third: { name: "???" },
  //   },
  //   highSchool: {
  //     first: { name: "???" },
  //     second: { name: "???" },
  //     third: { name: "???" },
  //   },
  //   middleSchool: {
  //     first: { name: "???" },
  //     second: { name: "???" },
  //     third: { name: "???" },
  //   },
  // },
  "2024": {
    adult: {
      first: { name: "clay419" },
      second: { name: "이정주" },
      third: { name: "S1ro1n3heWo0" },
    },
    highSchool: {
      first: { name: "Nightcord at 13:37" },
      second: { name: "PLAYLIST" },
      third: { name: "pdw0412" },
    },
    middleSchool: {
      first: { name: "Cheshire" },
      second: { name: "imnyang" },
      third: { name: "18 USC § 2441" },
    },
  },
  "2023": {
    adult: {
      first: { name: "LittleDev0617" },
      second: { name: "brwook" },
      third: { name: "고터에버즈두고온사람" },
    },
    highSchool: {
      first: { name: "mjhmjh1104" },
      second: { name: "arku" },
      third: { name: "kio" },
    },
    middleSchool: {
      first: { name: "Cheshire" },
      second: { name: "Boramae 영재영" },
      third: { name: "bmcyver" },
    },
  },
  "2022": {
    adult: {
      first: { name: "???" },
      second: { name: "???" },
      third: { name: "???" },
    },
    highSchool: {
      first: { name: "???" },
      second: { name: "???" },
      third: { name: "???" },
    },
    middleSchool: {
      first: { name: "???" },
      second: { name: "???" },
      third: { name: "???" },
    },
  },
};

// 유틸리티 함수들
export const getDivisionName = (division: keyof YearWinners): string => {
  const divisionNames = {
    adult: "일반부",
    highSchool: "고등부",
    middleSchool: "중등부",
  };
  return divisionNames[division];
};

export const getRankName = (rank: keyof DivisionWinners): string => {
  const rankNames = {
    first: "1위",
    second: "2위",
    third: "3위",
  };
  return rankNames[rank];
};

export const getYears = (): string[] => {
  return Object.keys(Winners).sort((a, b) => b.localeCompare(a));
};
