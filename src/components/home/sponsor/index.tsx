import { motion } from "motion/react";

import { Section, Typo } from "@/components/ui";
import { FlexAlign, HStack, VStack } from "@/components/ui/stack";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks";

import s from "./style.module.scss";

export default function Sponsor() {
  const hostingAnimation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });

  const sponsorAnimation = useStaggerAnimation({
    threshold: 0.2,
    delay: 0.4,
    duration: 0.6,
  });

  return (
    <Section padding={64} gap={64}>
      <motion.div
        ref={hostingAnimation.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={
          hostingAnimation.isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Hosting />
      </motion.div>
      <motion.div
        className={s.sponsor_wrap}
        ref={sponsorAnimation.ref}
        variants={sponsorAnimation.containerVariants}
        initial="hidden"
        animate={sponsorAnimation.isInView ? "visible" : "hidden"}
      >
        <motion.div variants={sponsorAnimation.itemVariants}>
          <Typo.Body className={s.sponsor_text}>
            2025 Layer7 CTF는 다음 기업들과 함께합니다
          </Typo.Body>
        </motion.div>
        <VStack gap={64} align={FlexAlign.Center}>
          <motion.div variants={sponsorAnimation.itemVariants}>
            <VStack gap={24} align={FlexAlign.Center}>
              <div className={`${s.sponsor_title} ${s.diamond}`}>
                <Typo.Body>Diamond Sponsor</Typo.Body>
              </div>
              <HStack
                gap={20}
                align={FlexAlign.Center}
                className={s.sponsor_images}
              >
                <motion.img
                  variants={sponsorAnimation.itemVariants}
                  src="/images/sponsor/dreamhack.png"
                  alt="Dreamhack sponsor"
                  transition={{ duration: 0.3 }}
                  style={{ height: 77 }}
                />
                <motion.img
                  variants={sponsorAnimation.itemVariants}
                  src="/images/sponsor/hspace.svg"
                  alt="Hspace sponsor"
                  transition={{ duration: 0.3 }}
                  style={{ height: 40 }}
                />
              </HStack>
            </VStack>
          </motion.div>
          <motion.div variants={sponsorAnimation.itemVariants}>
            <VStack gap={24} align={FlexAlign.Center}>
              <div className={`${s.sponsor_title} ${s.gold}`}>
                <Typo.Body>Gold Sponsor</Typo.Body>
              </div>
              <HStack
                gap={20}
                align={FlexAlign.Center}
                className={s.sponsor_images}
              >
                <motion.img
                  src="/images/sponsor/enki_whitehat.png"
                  alt="ENKI Whitehat sponsor"
                  transition={{ duration: 0.3 }}
                  style={{ height: 55, filter: "brightness(0) invert(1)" }}
                />
              </HStack>
            </VStack>
          </motion.div>
        </VStack>
      </motion.div>
    </Section>
  );
}

function Hosting() {
  return (
    <div className={s.hosting}>
      <HStack gap={20} align={FlexAlign.Center}>
        <Typo.Body className={s.sponsor_text}>주최</Typo.Body>
        <HStack gap={12} align={FlexAlign.Center}>
          <motion.img
            src="/sunrin.svg"
            alt="Sunrin sponsor"
            className={s.sunrin}
            transition={{ duration: 0.3 }}
          />
          <Typo.BodyLarge>선린인터넷고등학교</Typo.BodyLarge>
        </HStack>
      </HStack>
      <HStack gap={20} align={FlexAlign.Center}>
        <Typo.Body className={s.sponsor_text}>주관</Typo.Body>
        <HStack gap={12} align={FlexAlign.Center}>
          <motion.img
            src="/layer7.svg"
            alt="Layer7 sponsor"
            className={s.layer7}
            transition={{ duration: 0.3 }}
          />
          <Typo.BodyLarge>Layer7</Typo.BodyLarge>
        </HStack>
      </HStack>
    </div>
  );
}
