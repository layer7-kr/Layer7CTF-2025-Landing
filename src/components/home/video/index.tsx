import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { Section } from "@/components/ui";
import Button from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks";

import s from "./style.module.scss";

export default function Video() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonAnimation = useScrollAnimation({
    threshold: 0.2,
    delay: 0.2,
    duration: 0.8,
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    video.play().catch(() => {
      // 자동 재생 실패 시 무시
    });

    return () => {
      video.pause();
    };
  }, [isOpen]);

  return (
    <>
      <Section padding={64} gap={0}>
        <motion.div
          ref={buttonAnimation.ref}
          initial={{ opacity: 0, y: 30 }}
          animate={
            buttonAnimation.isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={s.button_container}
        >
          <Button onClick={() => setIsOpen(true)} size="lg">
            영상 보기
          </Button>
        </motion.div>
      </Section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={s.modal_overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={s.modal_content}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={s.close_button}
                onClick={() => setIsOpen(false)}
                aria-label="닫기"
              >
                <X size={24} />
              </button>
              <video
                ref={videoRef}
                className={s.video}
                loop
                muted
                playsInline
                controls
              >
                <source src="/asd.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

