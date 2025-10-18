import { motion } from "motion/react";

import { Section, Typo } from "@/components/ui";
import { FlexAlign, VStack } from "@/components/ui/stack";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks";

import s from "./style.module.scss";

export default function About() {
  const titleAnimation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });

  const historyAnimation = useStaggerAnimation({
    threshold: 0.2,
    delay: 0.4,
    duration: 0.6,
  });

  return (
    <Section>
      <div className={s.container}>
        <motion.div
          ref={titleAnimation.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={
            titleAnimation.isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : { opacity: 0, y: 50 }
          }
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          <VStack gap={16} align={FlexAlign.Center}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                titleAnimation.isInView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Typo.Headline>Layer7 CTF가 무엇인가요?</Typo.Headline>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                titleAnimation.isInView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Typo.BodyLarge className={s.about_description}>
                2010년도 대한민국 최초로 고등학생이 주최한 <br /> 전국 해킹
                대회로 시작해 2025년도까지 이어져 오고 있는 해킹 대회입니다.
              </Typo.BodyLarge>
            </motion.div>
          </VStack>
        </motion.div>
        <motion.div className={s.history_wrap} ref={historyAnimation.ref}>
          <motion.div
            className={s.history}
            initial={{ opacity: 0, y: 30 }}
            animate={
              historyAnimation.isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={s.history_name}>
              <img src="/layer7.svg" alt="Layer7" className={s.history_image} />
              <Typo.Body>Layer7 Hacking Festival</Typo.Body>
            </div>
            <Typo.BodyLarge className={s.history_date}>
              2010 ~ 2013
            </Typo.BodyLarge>
            <div className={s.history_dot} />
          </motion.div>
          <div className={s.history_center}>
            <motion.div
              className={s.history}
              initial={{ opacity: 0, y: 30 }}
              animate={
                historyAnimation.isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className={s.history_name}>
                <img
                  src="/sunrin.svg"
                  alt="Layer7"
                  className={s.history_image}
                />
                <Typo.Body>선린모의해킹방어대회</Typo.Body>
              </div>
              <Typo.BodyLarge className={s.history_date}>
                2014 ~ 2015
              </Typo.BodyLarge>
              <div className={s.history_dot} />
            </motion.div>
          </div>
          <motion.div
            className={s.history}
            initial={{ opacity: 0, y: 30 }}
            animate={
              historyAnimation.isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className={`${s.history_name} ${s.current}`}>
              <img
                src="/layer7_black.svg"
                alt="Layer7"
                className={s.history_image}
              />
              <Typo.Body>Layer7 CTF</Typo.Body>
            </div>
            <Typo.BodyLarge className={s.history_date}>
              2016 ~ 현재
            </Typo.BodyLarge>
            <div className={s.history_dot} />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
