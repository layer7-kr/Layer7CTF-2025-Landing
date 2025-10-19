import { motion } from "motion/react";

import { Section, Typo } from "@/components/ui";
import { FlexAlign, VStack } from "@/components/ui/stack";
import { Prize } from "@/data/prize";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks";

import s from "./style.module.scss";

export default function Money() {
  const goods = [
    {
      id: 1,
      src: "/images/goods/dreamhack_starter.png",
      alt: "상품 [드림핵 스타터 1년 구독권]",
    },
    { id: 2, src: "/images/goods/airpods.png", alt: "상품 [AirPods 4 노이즈캔슬링]" },
    { id: 3, src: "/images/goods/dreamhack_battery.png", alt: "상품 [드림핵 보조배터리]" },
    { id: 5, src: "/images/goods/pad.png", alt: "상품 [드림핵 장패드]" },
  ];

  // 아이템 3회 반복 + 두 번째 반복 뒤에 첫 아이템을 한 개 더 삽입해 끊김 최소화
  const repeatedGoods = [...goods, ...goods, ...goods];
  const insertIndex = goods.length * 2; // 두 번째 반복의 끝 지점
  const extendedGoods = [
    ...repeatedGoods.slice(0, insertIndex),
    { ...goods[0], id: Number(`${goods[0].id}999`) },
    ...repeatedGoods.slice(insertIndex),
  ];

  // 기존 데이터 사용 제거 (정적 테이블 사용)

  const titleAnimation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });

  const tableAnimation = useStaggerAnimation({
    threshold: 0.2,
    delay: 0.4,
    duration: 0.6,
  });

  const carouselAnimation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.6,
    duration: 0.8,
  });

  // 상금 문자열에서 현금 금액(예: "20만원")만 추출
  const extractCashAmount = (rawPrize: string) => {
    const match = rawPrize.match(/\d+\s*만원/);
    return match ? match[0].replace(/\s+/g, "") : rawPrize;
  };

  // 상금 문자열에서 비현금 상품 부분 추출 (개행 보존)
  const extractGoods = (rawPrize: string) => {
    const afterCash = rawPrize.split("상금 및")[1]?.trim();
    return (afterCash ?? "").trim() || "-";
  };

  return (
    <>
      {/* 상금/부상 섹션 */}
      <Section gap={100}>
        <motion.div
          className={s.money_container}
          ref={titleAnimation.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={
            titleAnimation.isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 50 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <VStack align={FlexAlign.Center}>
            <Typo.BodyLarge>대회 총 상금</Typo.BodyLarge>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                titleAnimation.isInView
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.8, opacity: 0 }
              }
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typo.Headline className={s.money_title}>
                {Prize.total.toLocaleString("ko-KR")}원
              </Typo.Headline>
            </motion.div>
          </VStack>

          <motion.div
            className={s.special_prize}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              tableAnimation.isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.6, delay: 0.8 }}
            data-first={true}
          >
            <Typo.Body className={s.special_prize_text}>
              모든 부문 상위 3명에게 선린인터넷고등학교장상이 시상됩니다.
            </Typo.Body>
          </motion.div>

          <motion.div
            ref={tableAnimation.ref}
            variants={tableAnimation.containerVariants}
            initial="hidden"
            animate={tableAnimation.isInView ? "visible" : "hidden"}
          >
            <VStack gap={48} className={s.money_table}>
              <div className={s.table_wrapper}>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th>부문</th>
                      <th>순위</th>
                      <th>상금</th>
                      <th>상품</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={s.group_general}>
                      <td rowSpan={3}>일반부</td>
                      <td>1등</td>
                      <td>{extractCashAmount(Prize.general.first.prize)}</td>
                      <td>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.general.first.prize)}
                        </span>
                      </td>
                    </tr>
                    <tr className={s.group_general}>
                      <td>2등</td>
                      <td>{extractCashAmount(Prize.general.second.prize)}</td>
                      <td>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.general.second.prize)}
                        </span>
                      </td>
                    </tr>
                    <tr className={s.group_general}>
                      <td>3등</td>
                      <td>{extractCashAmount(Prize.general.third.prize)}</td>
                      <td>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.general.third.prize)}
                        </span>
                      </td>
                    </tr>
                    <tr className={s.group_high}>
                      <td rowSpan={3}>고등부</td>
                      <td>1등</td>
                      <td>{extractCashAmount(Prize.high.first.prize)}</td>
                      <td>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.high.first.prize)}
                        </span>
                      </td>
                    </tr>
                    <tr className={s.group_high}>
                      <td>2등</td>
                      <td>{extractCashAmount(Prize.high.second.prize)}</td>
                      <td>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.high.second.prize)}
                        </span>
                      </td>
                    </tr>
                    <tr className={s.group_high}>
                      <td>3등</td>
                      <td>{extractCashAmount(Prize.high.third.prize)}</td>
                      <td>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.high.third.prize)}
                        </span>
                      </td>
                    </tr>
                    <tr className={s.group_middle}>
                      <td rowSpan={3}>중등부</td>
                      <td>1등</td>
                      <td>{extractCashAmount(Prize.middle.first.prize)}</td>
                      <td>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.middle.first.prize)}
                        </span>
                      </td>
                    </tr>
                    <tr className={s.group_middle}>
                      <td>2등</td>
                      <td>{extractCashAmount(Prize.middle.second.prize)}</td>
                      <td>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.middle.second.prize)}
                        </span>
                      </td>
                    </tr>
                    <tr className={s.group_middle}>
                      <td>3등</td>
                      <td>{extractCashAmount(Prize.middle.third.prize)}</td>
                      <td>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.middle.third.prize)}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={s.table_mobile}>
                <div className={s.card_group}>
                  <div className={s.group_header}>
                    <Typo.Body>일반부</Typo.Body>
                  </div>
                  <div className={s.card}>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>구분</Typo.Body>
                      <Typo.Body>1등</Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상금</Typo.Body>
                      <Typo.Body>
                        {extractCashAmount(Prize.general.first.prize)}
                      </Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상품</Typo.Body>
                      <Typo.Body>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.general.first.prize)}
                        </span>
                      </Typo.Body>
                    </div>
                  </div>
                  <div className={s.card}>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>구분</Typo.Body>
                      <Typo.Body>2등</Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상금</Typo.Body>
                      <Typo.Body>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractCashAmount(Prize.general.second.prize)}
                        </span>
                      </Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상품</Typo.Body>
                      <Typo.Body>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.general.second.prize)}
                        </span>
                      </Typo.Body>
                    </div>
                  </div>
                  <div className={s.card}>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>구분</Typo.Body>
                      <Typo.Body>3등</Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상금</Typo.Body>
                      <Typo.Body>
                        {extractCashAmount(Prize.general.third.prize)}
                      </Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상품</Typo.Body>
                      <Typo.Body>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.general.third.prize)}
                        </span>
                      </Typo.Body>
                    </div>
                  </div>
                </div>
                <div className={s.card_group}>
                  <div className={s.group_header}>고등부</div>
                  <div className={s.card}>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>구분</Typo.Body>
                      <Typo.Body>1등</Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상금</Typo.Body>
                      <Typo.Body>
                        {extractCashAmount(Prize.high.first.prize)}
                      </Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상품</Typo.Body>
                      <Typo.Body>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.high.first.prize)}
                        </span>
                      </Typo.Body>
                    </div>
                  </div>
                  <div className={s.card}>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>구분</Typo.Body>
                      <Typo.Body>2등</Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상금</Typo.Body>
                      <Typo.Body>
                        {extractCashAmount(Prize.high.second.prize)}
                      </Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상품</Typo.Body>
                      <Typo.Body>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.high.second.prize)}
                        </span>
                      </Typo.Body>
                    </div>
                  </div>
                  <div className={s.card}>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>구분</Typo.Body>
                      <Typo.Body>3등</Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상금</Typo.Body>
                      <Typo.Body>
                        {extractCashAmount(Prize.high.third.prize)}
                      </Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상품</Typo.Body>
                      <Typo.Body>
                        <span style={{ whiteSpace: "pre-line" }}>
                          {extractGoods(Prize.high.third.prize)}
                        </span>
                      </Typo.Body>
                    </div>
                  </div>
                </div>
                <div className={s.card_group}>
                  <div className={s.group_header}>중등부</div>
                  <div className={s.card}>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>구분</Typo.Body>
                      <Typo.Body>1등</Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상금</Typo.Body>
                      <Typo.Body>
                        {extractCashAmount(Prize.middle.first.prize)}
                      </Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상품</Typo.Body>
                      <Typo.Body>
                        {extractGoods(Prize.middle.first.prize)}
                      </Typo.Body>
                    </div>
                  </div>
                  <div className={s.card}>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>구분</Typo.Body>
                      <Typo.Body>2등</Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상금</Typo.Body>
                      <Typo.Body>
                        {extractCashAmount(Prize.middle.second.prize)}
                      </Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상품</Typo.Body>
                      <Typo.Body>
                        {extractGoods(Prize.middle.second.prize)}
                      </Typo.Body>
                    </div>
                  </div>
                  <div className={s.card}>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>구분</Typo.Body>
                      <Typo.Body>3등</Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상금</Typo.Body>
                      <Typo.Body>
                        {extractCashAmount(Prize.middle.third.prize)}
                      </Typo.Body>
                    </div>
                    <div className={s.card_row}>
                      <Typo.Body className={s.label}>상품</Typo.Body>
                      <Typo.Body>
                        {extractGoods(Prize.middle.third.prize)}
                      </Typo.Body>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                className={s.special_prize}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  tableAnimation.isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Typo.Body>
                  수상자 전원에게 대회 굿즈와 후원사 굿즈가 담긴 패키지 박스를
                  드립니다.
                </Typo.Body>
              </motion.div>
            </VStack>
          </motion.div>
        </motion.div>
      </Section>

      {/* 상품 섹션 */}
      <Section gap={100}>
        <motion.div
          className={s.carousel_section}
          ref={carouselAnimation.ref}
          {...carouselAnimation.motionProps}
        >
          <Typo.BodyLarge style={{ marginBottom: 32, textAlign: "center" }}>
            이 외의 다양한 특별상이 준비되어 있어요
          </Typo.BodyLarge>
          <div className={s.carousel_container}>
            <motion.div className={s.carousel_track}>
              <div className={s.carousel_slides}>
                {extendedGoods.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    className={s.carousel_slide}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={item.src} alt={item.alt} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
