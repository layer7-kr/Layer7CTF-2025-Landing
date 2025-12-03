import { Typo } from "@/components/ui";
import { Article } from "@/types/article";

import s from "./style.module.scss";

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  const isRecent = (() => {
    const articleDate = new Date(article.date);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return articleDate >= oneWeekAgo;
  })();

  return (
    <div className={s.listItem} onClick={onClick}>
      <div className={s.titleContainer}>
        <Typo.Headline className={s.title}>{article.title}</Typo.Headline>
        {isRecent && <span className={s.newTag}>NEW</span>}
      </div>
      <Typo.Body className={s.date}>
        {new Date(article.date).toLocaleDateString('ko-KR')}
      </Typo.Body>
    </div>
  );
}
