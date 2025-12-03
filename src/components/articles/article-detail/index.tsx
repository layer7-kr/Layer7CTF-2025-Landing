import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, NewTag, Section, Typo } from "@/components/ui";
import { FlexAlign, FlexJustify, HStack, VStack } from "@/components/ui/stack";
import { getArticleBySlug } from "@/utils/posts";

import s from "./style.module.scss";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = id ? getArticleBySlug(id) : null;
  const navigate = useNavigate();

  console.log(article);

  if (!article) {
    return (
      <Section padding={32} gap={64}>
        <div className={s.container}>
          <Typo.Headline>게시글을 찾을 수 없습니다.</Typo.Headline>
        </div>
      </Section>
    );
  }

  return (
    <Section padding={32} gap={64}>
      <div className={s.container}>
        <Button
          variant="secondary"
          leadingIcon={ArrowLeft}
          onClick={() => navigate(-1)}
        >
          뒤로가기
        </Button>
        <div className={s.header}>
          <Typo.Headline className={s.title}>
            {article.title}
            {(() => {
              const articleDate = new Date(article.date);
              const oneWeekAgo = new Date();
              oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
              return articleDate >= oneWeekAgo ? (
                <span style={{ marginLeft: 8 }}>
                  <NewTag />
                </span>
              ) : null;
            })()}
          </Typo.Headline>
          <Typo.Body className={s.date}>
            {new Date(article.date).toLocaleDateString("ko-KR")}
          </Typo.Body>
        </div>

        <div className={s.content}>
          <div
            className={s.markdown}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
        <HStack
          fullWidth
          justify={FlexJustify.End}
          gap={16}
          className={s.navigation}
        >
          <HStack fullWidth gap={16}>
            {article.previous && (
              <a
                href={`/article/${article.previous.slug}`}
                className={s.previous}
              >
                <ArrowLeft />
                <VStack align={FlexAlign.Start} gap={4}>
                  <Typo.Body>이전 글</Typo.Body>
                  <Typo.Body className={s.previous_title}>
                    {article.previous?.title}
                  </Typo.Body>
                </VStack>
              </a>
            )}
          </HStack>
          <HStack fullWidth gap={16}>
            {article.next && (
              <a href={`/article/${article.next.slug}`} className={s.next}>
                <VStack align={FlexAlign.End} gap={4}>
                  <Typo.Body>다음 글</Typo.Body>
                  <Typo.Body className={s.next_title}>
                    {article.next?.title}
                  </Typo.Body>
                </VStack>
                <ArrowRight />
              </a>
            )}
          </HStack>
        </HStack>
      </div>
    </Section>
  );
}
