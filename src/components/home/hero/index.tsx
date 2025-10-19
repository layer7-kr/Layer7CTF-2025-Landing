import Lottie from "lottie-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Typo } from "@/components/ui";
import Spacing from "@/components/ui/spacing";
import { FlexAlign, VStack } from "@/components/ui/stack";
import { Competition } from "@/data/competition";
import { useParallaxAnimation, useScrollAnimation } from "@/hooks";

import s from "./style.module.scss";

export default function Hero() {
  const textAnimation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });

  const mapAnimation = useParallaxAnimation();

  const [isFlagClicked, setIsFlagClicked] = useState(false);
  const [isGreenClicked, setIsGreenClicked] = useState(false);
  const [lottieData, setLottieData] = useState<object | null>(null);

  const handleFlagClick = () => {
    if (isFlagClicked) return;
    setIsFlagClicked(true);
  };

  const handleGreenClick = () => {
    if (isGreenClicked) return;
    setIsGreenClicked(true);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/lottie/confetti.json");
        const data: object = await res.json();
        if (mounted) setLottieData(data);
      } catch {
        // ignore load error
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const now = Date.now();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      let targetTime = 0;

      if (now < Competition[0].startDate) {
        // 신청 시작 전
        targetTime = Competition[0].startDate;
      } else if (now >= Competition[0].startDate && now <= Competition[0].endDate) {
        // 신청 기간 중
        targetTime = Competition[0].endDate;
      } else if (now > Competition[0].endDate && now < Competition[1].startDate) {
        // 신청 마감 후 대회 시작 전
        targetTime = Competition[1].startDate;
      } else if (now >= Competition[1].startDate && now <= Competition[1].endDate) {
        // 대회 진행 중
        targetTime = Competition[1].endDate;
      } else {
        // 대회 종료 후
        targetTime = 0;
      }

      const difference = targetTime - Date.now();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [now]);

  const getStatusText = () => {
    if (now < Competition[0].startDate) {
      return "Coming Soon";
    } else if (now >= Competition[0].startDate && now <= Competition[0].endDate) {
      return "참가 신청 마감까지";
    } else if (now > Competition[0].endDate && now < Competition[1].startDate) {
      return "대회 시작까지";
    } else if (now >= Competition[1].startDate && now <= Competition[1].endDate) {
      return "대회 종료까지";
    } else {
      return "대회가 종료되었습니다";
    }
  };

  const getCurrentStatus = () => {
    if (now < Competition[0].startDate) return "coming-soon";
    if (now >= Competition[0].startDate && now <= Competition[0].endDate) return "open";
    if (now > Competition[0].endDate && now < Competition[1].startDate) return "before-competition";
    if (now >= Competition[1].startDate && now <= Competition[1].endDate) return "started";
    return "ended";
  };

  const registrationStatus = getCurrentStatus();

  return (
    <section className={s.hero}>
      <motion.div
        className={s.hero_text}
        ref={textAnimation.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={
          textAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <VStack gap={12} align={FlexAlign.Center}>
          <motion.h2
            className={s.hero_subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={
              textAnimation.isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            We hack the
          </motion.h2>
          <motion.h1
            className={s.hero_title}
            initial={{ opacity: 0, y: 20 }}
            animate={
              textAnimation.isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: "easeOut",
            }}
          >
            2025 Layer7 CTF
          </motion.h1>
        </VStack>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            textAnimation.isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className={s.buttons}>
            {(registrationStatus === "coming-soon" ||
              registrationStatus === "open" ||
              registrationStatus === "before-competition" ||
              registrationStatus === "started") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  textAnimation.isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 1.0 }}
                className={s.countdown_container}
              >
                <Typo.BodyLarge className={s.coming_soon}>
                  {getStatusText()}
                </Typo.BodyLarge>
                <Typo.Headline>
                  {timeLeft.days}일 {timeLeft.hours}시간 {timeLeft.minutes}분 {timeLeft.seconds}초
                </Typo.Headline>
              </motion.div>
            )}

            {registrationStatus === "ended" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  textAnimation.isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 1.0 }}
                className={s.countdown_container}
              >
                <Typo.BodyLarge className={s.coming_soon}>
                  대회가 종료되었습니다
                </Typo.BodyLarge>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <Spacing size={120} />

      <motion.div
        ref={mapAnimation.ref}
        initial={{ y: 50 }}
        animate={
          mapAnimation.isInView
            ? {
                y: 0,
              }
            : {
                y: 50,
              }
        }
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: "easeOut",
        }}
        className={s.hero_map_container}
      >
        <motion.div
          className={s.hero_map_inner}
          style={{ opacity: mapAnimation.isInView ? mapAnimation.opacity : 0 }}
        >
          <motion.img
            src="/flag.svg"
            alt="Layer7 CTF Flag"
            className={s.hero_flag}
            onClick={handleFlagClick}
            initial={{ opacity: 1 }}
            animate={{ opacity: isFlagClicked ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.img
            src="/flag-green.svg"
            alt="Layer7 CTF Flag Green"
            className={s.hero_flag_green}
            onClick={handleGreenClick}
            initial={{ opacity: 1 }}
            animate={{ opacity: isGreenClicked ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {isFlagClicked && (
            <div className={s.flag_wrap}>
              <>
                {lottieData && (
                  <Lottie
                    className={s.flag_lottie}
                    animationData={lottieData}
                    loop={false}
                    autoplay
                  />
                )}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: [10, 0, -10], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                  }}
                >
                  <Typo.Body className={s.flag_text}>
                    Layer7{`{dhkwlqrkrhtlvek@2025}`}
                  </Typo.Body>
                </motion.div>
              </>
            </div>
          )}
          {isGreenClicked && (
            <div className={s.flag_wrap_green}>
              <>
                {lottieData && (
                  <Lottie
                    className={s.flag_lottie}
                    animationData={lottieData}
                    loop={false}
                    autoplay
                  />
                )}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: [10, 0, -10], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                  }}
                >
                  <Typo.Body className={s.flag_text_green}>
                    Layer7{`{0101010101010101010101}`}
                  </Typo.Body>
                </motion.div>
              </>
            </div>
          )}
          <img
            src="/images/hero/map.svg"
            alt="Layer7 CTF"
            className={s.hero_map}
          />
          <div className={s.hero_map_overlay} />
        </motion.div>
      </motion.div>
    </section>
  );
}
