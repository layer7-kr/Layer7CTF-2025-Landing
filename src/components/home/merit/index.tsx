import { motion } from "motion/react";

import { Section, Typo } from "@/components/ui";
import { VStack } from "@/components/ui/stack";
import { useParallaxAnimation, useScrollAnimation } from "@/hooks";

import s from "./style.module.scss";

interface Props {
  reversed?: boolean;
  text: string;
  description: string;
  image: string;
}

export default function Merit({
  reversed = false,
  text = "재학생과 졸업생이 함께하는 대회",
  description = "설명을 적으시오",
  image = "/images/merit/merit_quiz.png",
}: Props) {
  const textAnimation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });

  const imageAnimation = useParallaxAnimation();

  const TextBlock = (
    <motion.div
      ref={textAnimation.ref}
      initial={{ opacity: 0, y: 50 }}
      animate={
        textAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
      }
      transition={{ duration: 0.8, delay: 0.2 }}
      className={s.left}
    >
      <VStack gap={16}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={
            textAnimation.isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: -50 }
          }
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typo.BodyLarge>{text}</Typo.BodyLarge>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={
            textAnimation.isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: -50 }
          }
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Typo.Body className={s.description}>{description}</Typo.Body>
        </motion.div>
      </VStack>
    </motion.div>
  );

  const ImageBlock = (
    <motion.div
      ref={imageAnimation.ref}
      style={
        imageAnimation.isInView
          ? {
              y: imageAnimation.y,
              scale: imageAnimation.scale,
            }
          : {}
      }
      className={s.image_container}
    >
      <motion.img
        src={image}
        alt={`${text} 이미지`}
        className={s.image}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );

  return (
    <Section gap={48} className={s.merit}>
      {reversed ? ImageBlock : TextBlock}
      {reversed ? TextBlock : ImageBlock}
    </Section>
  );
}
