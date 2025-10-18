import { Section, Typo } from "@/components/ui";
import { getAllArticles } from "@/utils/posts";
import ArticleCard from "../article-card";

import s from "./style.module.scss";

export default function ArticleList() {
  const articles = getAllArticles();

  return (
    <Section padding={32} gap={64}>
      <div className={s.container}>
        <Typo.Headline>공지사항</Typo.Headline>

        <div className={s.articles_list}>
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              onClick={() => {
                window.location.href = `/article/${article.slug}`;
              }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
