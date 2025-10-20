import { Send } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Button, NewTag, Section, Typo } from "@/components/ui";
import { HStack, VStack } from "@/components/ui/stack";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks";
import type { Post } from "@/utils/markdown";
import { getLatestPosts } from "@/utils/posts";

import s from "./style.module.scss";

export default function Contact() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const isDisabled = message.trim().length === 0;

  const subject = `[Layer7 CTF 문의] ${name || ""}`;
  const bodyLines = `${message || ""}\n\n- 보낸이: ${name || "익명"}`;
  const mailtoHref = `mailto:ctf@layer7.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;

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

  const formAnimation = useStaggerAnimation({
    threshold: 0.2,
    delay: 0.6,
    duration: 0.6,
  });

  const noticeAnimation = useStaggerAnimation({
    threshold: 0.2,
    delay: 0.4,
    duration: 0.6,
  });

  // 최근 게시물 여부(7일 이내) 판단
  const isRecent = (dateString?: string): boolean => {
    if (!dateString) return false;
    const createdAt = new Date(dateString);
    if (Number.isNaN(createdAt.getTime())) return false;
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const latestPosts = await getLatestPosts(5);
        setPosts(latestPosts);
      } catch (error) {
        console.error("공지사항을 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <Section id="contact">
      <HStack className={s.content}>
        <motion.div
          className={s.notice_wrap}
          id="notice"
          ref={leftAnimation.ref}
          initial={{ opacity: 0, y: -100 }}
          animate={
            leftAnimation.isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -100 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={s.notice_title}>
            <Typo.BodyLarge>공지사항</Typo.BodyLarge>
          </div>
          <motion.div
            ref={noticeAnimation.ref}
            variants={noticeAnimation.containerVariants}
            initial="hidden"
            animate={noticeAnimation.isInView ? "visible" : "hidden"}
          >
            <VStack fullWidth>
              {loading ? (
                <motion.div
                  className={s.notice_item}
                  variants={noticeAnimation.itemVariants}
                >
                  <Typo.Body>로딩 중...</Typo.Body>
                </motion.div>
              ) : posts.length === 0 ? (
                <motion.div
                  className={s.notice_item}
                  variants={noticeAnimation.itemVariants}
                >
                  <Typo.Body>공지사항이 없습니다.</Typo.Body>
                </motion.div>
              ) : (
                posts.map((post) => (
                  <motion.a
                    key={post.slug}
                    href={`/article/${post.slug}`}
                    className={s.notice_item}
                    variants={noticeAnimation.itemVariants}
                  >
                    <HStack gap={8}>
                      <Typo.Body style={{ whiteSpace: "pre-line" }}>
                        {post.metadata.title}
                      </Typo.Body>
                      {isRecent(post.metadata.date) && <NewTag />}
                    </HStack>
                    <Typo.Body className={s.notice_date}>
                      {post.metadata.date}
                    </Typo.Body>
                  </motion.a>
                ))
              )}
            </VStack>
          </motion.div>
        </motion.div>
        <motion.div
          className={s.form_wrap}
          ref={rightAnimation.ref}
          initial={{ opacity: 0, y: -100 }}
          animate={
            rightAnimation.isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -100 }
          }
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typo.Display>문의하기</Typo.Display>
          <motion.div
            ref={formAnimation.ref}
            variants={formAnimation.containerVariants}
            initial="hidden"
            animate={formAnimation.isInView ? "visible" : "hidden"}
            style={{ marginTop: 24 }}
          >
            <VStack gap={12} className={s.form} fullWidth>
              <motion.input
                type="text"
                placeholder="이름"
                className={s.input}
                variants={formAnimation.itemVariants}
                whileFocus={{ scale: 1.02, borderColor: "#007bff" }}
                transition={{ duration: 0.3 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <motion.textarea
                placeholder="문의 내용을 입력해주세요."
                className={s.textarea}
                variants={formAnimation.itemVariants}
                whileFocus={{ scale: 1.02, borderColor: "#007bff" }}
                transition={{ duration: 0.3 }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <motion.div
                variants={formAnimation.itemVariants}
                whileTap={{ scale: 0.95 }}
                style={{ width: "100%" }}
              >
                <a
                  href={isDisabled ? undefined : mailtoHref}
                  onClick={isDisabled ? (e) => e.preventDefault() : undefined}
                  aria-disabled={isDisabled}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    leadingIcon={Send}
                    className={s.send_button}
                    size="lg"
                    disabled={isDisabled}
                  >
                    눌러서 문의하기
                  </Button>
                </a>
              </motion.div>
            </VStack>
          </motion.div>
        </motion.div>
      </HStack>
    </Section>
  );
}
