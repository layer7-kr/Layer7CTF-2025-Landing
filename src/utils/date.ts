export function getKoreanDate(date: Date, includeTime: boolean = true): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(includeTime && {
      hour: "2-digit",
      hour12: false,
    }),
    hour12: false,
  });
}
