import { File, Flag, Megaphone, Printer } from "lucide-react";
import { motion } from "motion/react";

import { NewTag, Typo } from "@/components/ui";
import { HStack, VStack } from "@/components/ui/stack";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks";
import { getAllArticles } from "@/utils/posts";

import s from "./style.module.scss";

export default function Calendar() {
  const [latestTitle, latestSlug, isNew] = (() => {
    try {
      const articles = getAllArticles();
      const first = articles[0];
      if (!first) return ["공지사항이 없습니다", "/notice", false] as const;
      const recentThreshold = new Date();
      recentThreshold.setDate(recentThreshold.getDate() - 7);
      const isRecent = new Date(first.date) >= recentThreshold;
      return [first.title, `/article/${first.slug}`, isRecent] as const;
    } catch {
      return ["공지사항이 없습니다", "/notice", false] as const;
    }
  })();

  const titleAnimation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });

  const cardAnimation = useStaggerAnimation({
    threshold: 0.2,
    delay: 0.4,
    duration: 0.6,
  });

  return (
    <section className={s.calendar}>
      <div className={s.content}>
        <motion.div
          style={{ width: "50%" }}
          ref={titleAnimation.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={
            titleAnimation.isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 50 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <VStack gap={42}>
            <VStack gap={16}>
              <Typo.Headline>대회 일정</Typo.Headline>
              <Typo.BodyLarge as={"p"} className={s.description}>
                모든 안내는 공지사항을 통해 전달됩니다.
                <br />
                공지사항을 수시로 확인하고 일정에 맞게 준비해주세요.
              </Typo.BodyLarge>
            </VStack>
            <a href={latestSlug} className={s.recent_notice}>
              <HStack gap={8}>
                <Megaphone size={20} />
                <Typo.Body>최근 공지</Typo.Body>
              </HStack>
              <HStack gap={12}>
                <Typo.Body>{latestTitle}</Typo.Body>
                {isNew && <NewTag />}
              </HStack>
              <Typo.Subtext className={s.recent_notice_link}>
                눌러서 공지사항 보러가기
              </Typo.Subtext>
            </a>
          </VStack>
        </motion.div>
        <motion.div
          style={{ width: "50%" }}
          ref={cardAnimation.ref}
          variants={cardAnimation.containerVariants}
          initial="hidden"
          animate={cardAnimation.isInView ? "visible" : "hidden"}
        >
          <VStack gap={12}>
            <motion.article
              className={`${s.card} ${s.card_now}`}
              variants={cardAnimation.itemVariants}
              transition={{ duration: 0.3 }}
            >
              <VStack gap={8}>
                <Typo.Display className={s.card_title}>신청 기간</Typo.Display>
                <Typo.Body className={s.card_date}>
                  10월 22일 ~ 11월 12일
                </Typo.Body>
              </VStack>
              <File className={s.card_icon} />
            </motion.article>

            <motion.article
              className={s.card}
              variants={cardAnimation.itemVariants}
              transition={{ duration: 0.3 }}
            >
              <VStack gap={20}>
                <VStack gap={8}>
                  <Typo.Display className={s.card_title}>
                    CTF 대회 기간
                  </Typo.Display>
                  <Typo.Body className={s.card_date}>
                    11월 15일 오전 10시 ~ 11월 16일 오전 10시
                  </Typo.Body>
                </VStack>
                <HStack gap={20}>
                  <Typo.Body className={s.card_info_name}>대회 방식</Typo.Body>
                  <Typo.Body className={s.card_info_value}>Jeopardy</Typo.Body>
                </HStack>
                <HStack gap={20}>
                  <Typo.Body className={s.card_info_name}>참가 장소</Typo.Body>
                  <Typo.Body className={s.card_info_value}>온라인</Typo.Body>
                </HStack>
              </VStack>
              <Flag className={s.card_icon} />
            </motion.article>

            <motion.article
              className={s.card}
              variants={cardAnimation.itemVariants}
              transition={{ duration: 0.3 }}
            >
              <VStack gap={8}>
                <Typo.Display className={s.card_title}>
                  대회 결과 발표
                </Typo.Display>
                <Typo.Body className={s.card_date}>11월 17일</Typo.Body>
              </VStack>
              <Printer className={s.card_icon} />
            </motion.article>
          </VStack>
        </motion.div>
      </div>
    </section>
  );
}
