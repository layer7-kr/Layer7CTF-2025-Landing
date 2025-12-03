import { motion } from "motion/react";

import { Section, Typo } from "@/components/ui";
import { FlexAlign, HStack, VStack } from "@/components/ui/stack";
import { Competition } from "@/data/competition";
import { Link } from "@/data/link";
import {
  useParallaxAnimation,
  useScrollAnimation,
  useStaggerAnimation,
} from "@/hooks";
import { getKoreanDate } from "@/utils/date";

import s from "./style.module.scss";

export default function CompetitionAbout() {
  const IconComponent = Competition[1].icon;

  const imageAnimation = useParallaxAnimation();

  const leftAnimation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });

  const rightAnimation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.4,
    duration: 0.8,
  });

  const eligibilityAnimation = useStaggerAnimation({
    threshold: 0.2,
    delay: 0.6,
    duration: 0.6,
  });

  return (
    <Section>
      <div className={s.form_about}>
        <motion.div
          ref={imageAnimation.ref}
          style={
            imageAnimation.isInView
              ? {
                  y: imageAnimation.y,
                  width: "100%",
                }
              : {
                  width: "100%",
                }
          }
        >
          <img
            src="/images/competition/sample.png"
            className={s.image}
            alt="competition"
          />
        </motion.div>
        <div className={s.content}>
          <motion.div
            className={s.left}
            ref={leftAnimation.ref}
            initial={{ opacity: 0, y: 100 }}
            animate={
              leftAnimation.isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 100 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <VStack gap={40}>
              <VStack gap={20}>
                <HStack gap={16} align={FlexAlign.Center}>
                  <motion.div transition={{ duration: 0.3 }}>
                    <IconComponent color="white" size={40} />
                  </motion.div>
                  <Typo.Headline>{Competition[1].title}</Typo.Headline>
                </HStack>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    leftAnimation.isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Typo.BodyLarge>
                    {getKoreanDate(new Date(Competition[1].startDate))} ~{" "}
                    {getKoreanDate(new Date(Competition[1].endDate))}
                  </Typo.BodyLarge>
                </motion.div>
              </VStack>
              <motion.div
                ref={eligibilityAnimation.ref}
                variants={eligibilityAnimation.containerVariants}
                initial="hidden"
                animate={eligibilityAnimation.isInView ? "visible" : "hidden"}
              >
                <VStack gap={20}>
                  {Competition[1].eligibility?.map((eligibility) => (
                    <motion.div
                      key={eligibility.name}
                      variants={eligibilityAnimation.itemVariants}
                      transition={{ duration: 0.3 }}
                    >
                      <HStack gap={12} align={FlexAlign.Center}>
                        <Typo.Body className={s.eligibility_name}>
                          {eligibility.name}
                        </Typo.Body>
                        <Typo.Body>{eligibility.value}</Typo.Body>
                      </HStack>
                    </motion.div>
                  ))}
                </VStack>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  leftAnimation.isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Typo.Subtext className={s.eligibility_description}>
                  * 부정행위 또는 서류 허위·미제출 등으로 인한 수상 부적격자
                  발생 시 차순위 수상자 시상
                </Typo.Subtext>
              </motion.div>
            </VStack>
          </motion.div>
          <motion.div
            className={s.right}
            ref={rightAnimation.ref}
            initial={{ opacity: 0, y: 100 }}
            animate={
              rightAnimation.isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 100 }
            }
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <VStack gap={24} align={FlexAlign.End}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  rightAnimation.isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Typo.BodyLarge>{Competition[1].description}</Typo.BodyLarge>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  rightAnimation.isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <VStack gap={6} className={s.preparation_container}>
                  <Typo.Body className={s.preparation_name}>준비물</Typo.Body>
                  <VStack>
                    <Typo.Body>
                      {Competition[1].preparation?.join(", ")}
                    </Typo.Body>
                  </VStack>
                </VStack>
              </motion.div>
            </VStack>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={
                rightAnimation.isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 15 }
              }
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ marginTop: 32 }}
            >
              <a
                href={Link.rule_file}
                target="_blank"
                download
                style={{ textDecoration: "none" }}
              >
                {/* <Button size="lg" leadingIcon={Download}>
                  대회규칙 / 운영규정 다운 받기
                </Button> */}
              </a>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className={s.cheat_warning}
          initial={{ opacity: 0, y: 30 }}
          animate={
            rightAnimation.isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span>
            부정행위는 서버 로그 분석 및 문제풀이 검토 등을 통해 대회 종료
            이후에도 적발될 수 있습니다. <br />
            부정행위가 적발될 경우 운영진의 판단과 권한으로 참가 자격이
            박탈되고, 시상에서 제외될 수 있습니다.
          </span>
        </motion.div>
      </div>
    </Section>
  );
}
