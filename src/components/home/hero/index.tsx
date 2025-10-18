import Lottie from "lottie-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Button, Typo } from "@/components/ui";
import Spacing from "@/components/ui/spacing";
import { FlexAlign, VStack } from "@/components/ui/stack";
import { Competition } from "@/data/competition";
import { Link } from "@/data/link";
import { useParallaxAnimation, useScrollAnimation } from "@/hooks";

import s from "./style.module.scss";

export default function Hero() {
  const textAnimation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });

  const mapAnimation = useParallaxAnimation();

  // flag 클릭/애니메이션 상태
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

  // Lottie JSON 선로딩 (한 번만)
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

  // 접수 기간 확인
  const now = Date.now();
  const registrationStart = Competition[0].startDate;
  const registrationEnd = Competition[0].endDate;

  const getRegistrationStatus = () => {
    if (now < registrationStart) {
      return "coming-soon";
    } else if (now >= registrationStart && now <= registrationEnd) {
      return "open";
    } else {
      return "closed";
    }
  };

  const registrationStatus = getRegistrationStatus();

  // D-Day 카운트다운
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = registrationStart - Date.now();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [registrationStart]);

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
            {registrationStatus === "coming-soon" && (
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
                  Coming Soon
                </Typo.BodyLarge>
                <Typo.Headline>
                  {timeLeft.days}일 {timeLeft.hours}시간 {timeLeft.minutes}분 {timeLeft.seconds}초
                </Typo.Headline>
              </motion.div>
            )}

            {registrationStatus === "open" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  textAnimation.isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <a href={Link.registration} target="_blank">
                  <Button className={s.ctf_button}>
                    Layer7 CTF 참가 신청하기
                  </Button>
                </a>
              </motion.div>
            )}

            {registrationStatus === "closed" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  textAnimation.isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Typo.Headline className={s.closed}>신청 종료됨</Typo.Headline>
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
                  transition={{ duration: 2, ease: "easeOut" }}
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
