export interface PrizeInfo {
  medal: boolean;
  prize: string;
}

export interface PrizeCategory {
  first: PrizeInfo;
  second: PrizeInfo;
  third: PrizeInfo;
}

export interface PrizeData {
  total: number;
  middle: PrizeCategory;
  high: PrizeCategory;
  general: PrizeCategory;
}

export const Prize: PrizeData = {
  total: 3000000,
  middle: {
    first: {
      medal: true,
      prize: "16만원 상금 및\nDreamhack Pro Plan\n1년 구독권",
    },
    second: {
      medal: true,
      prize: "8만원 상금 및\nDreamhack Starter Plan\n1년 구독권",
    },
    third: {
      medal: true,
      prize: "6만원 상금 및\nDreamhack Starter Plan\n1년 구독권",
    },
  },
  high: {
    first: {
      medal: true,
      prize: "40만원 상금 및\nDreamhack Pro Plan\n1년 구독권",
    },
    second: {
      medal: true,
      prize: "30만원 상금 및\nDreamhack Starter Plan\n1년 구독권",
    },
    third: {
      medal: true,
      prize: "20만원 상금 및\nDreamhack Starter Plan\n1년 구독권",
    },
  },
  general: {
    first: {
      medal: false,
      prize: "80만원 상금 및\nDreamhack Pro Plan\n1년 구독권",
    },
    second: {
      medal: false,
      prize: "60만원 상금 및\nDreamhack 보조배터리",
    },
    third: {
      medal: false,
      prize: "40만원 상금 및\nDreamhack 우산",
    },
  },
};

export const getPrizeTableData = (category: PrizeCategory) => [
  {
    rank: "1등",
    certificate: "선린인터넷고등학교장",
    prize: category.first.prize,
  },
  {
    rank: "2등",
    certificate: "선린인터넷고등학교장",
    prize: category.second.prize,
  },
  {
    rank: "3등",
    certificate: "선린인터넷고등학교장",
    prize: category.third.prize,
  },
];
