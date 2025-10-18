import { Article } from "@/types/article";

import {
  formatDate,
  generateSlug,
  markdownToHtml,
  parseFrontmatter,
  Post,
} from "./markdown";

function toTime(value: string | undefined): number {
  if (!value) return 0;
  const t = Date.parse(value);
  return Number.isNaN(t) ? 0 : t;
}

/**
 * posts 폴더에서 모든 마크다운 파일을 가져와서 파싱합니다.
 * Vite의 import.meta.glob을 사용하여 동적으로 파일을 가져옵니다.
 */
export async function getAllPosts(): Promise<Post[]> {
  // Vite의 import.meta.glob을 사용하여 posts 폴더의 모든 .md 파일을 가져옵니다
  const modules = import.meta.glob("/src/posts/*.md", { as: "raw" });

  const posts: Post[] = [];

  for (const path in modules) {
    try {
      const content = await modules[path]();
      const { metadata, content: postContent } = parseFrontmatter(content);

      // 파일명에서 슬러그 생성
      const filename = path.split("/").pop() || "";
      const slug = generateSlug(filename);

      // 파일 수정 시간을 기반으로 날짜 설정 (metadata에 date가 없으면)
      const fileDate = new Date(); // 실제로는 파일 시스템에서 가져와야 하지만, 여기서는 현재 시간 사용
      const postDate = metadata.date || formatDate(fileDate);

      posts.push({
        slug,
        metadata: {
          ...metadata,
          date: postDate,
        },
        content: postContent,
      });
    } catch (error) {
      console.error(`Error loading post from ${path}:`, error);
    }
  }

  // 날짜 기준으로 내림차순 정렬 (최신순)
  return posts.sort(
    (a, b) => toTime(b.metadata.date) - toTime(a.metadata.date),
  );
}

/**
 * 최신 공지사항만 가져옵니다.
 */
export async function getLatestPosts(limit: number = 5): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
}

/**
 * Article 타입으로 모든 공지사항을 가져옵니다.
 */
export function getAllArticles(): Article[] {
  const modules = import.meta.glob("/src/posts/*.md", {
    as: "raw",
    eager: true,
  });

  const articles: Article[] = [];

  for (const path in modules) {
    try {
      const content = modules[path] as string;
      const { metadata, content: postContent } = parseFrontmatter(content);

      // 파일명에서 슬러그 생성
      const filename = path.split("/").pop() || "";
      const slug = generateSlug(filename);

      // 파일 수정 시간을 기반으로 날짜 설정 (metadata에 date가 없으면)
      const fileDate = new Date();
      const postDate = metadata.date || formatDate(fileDate);

      articles.push({
        slug,
        title: metadata.title || "제목 없음",
        date: postDate,
        content: markdownToHtml(postContent),
      });
    } catch (error) {
      console.error(`Error loading article from ${path}:`, error);
    }
  }

  // 날짜 기준으로 내림차순 정렬 (최신순)
  return articles.sort((a, b) => toTime(b.date) - toTime(a.date));
}

interface ArticleWithPreviousAndNext extends Article {
  previous: Article | null;
  next: Article | null;
}

/**
 * 슬러그로 특정 공지사항을 가져옵니다.
 */
export function getArticleBySlug(
  slug: string,
): ArticleWithPreviousAndNext | null {
  const articles = getAllArticles();
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) {
    return null;
  }
  // articles는 최신순(내림차순) 정렬되어 있음
  // 이전 글: 현재보다 오래된 글 → index + 1 (경계 체크: index < length - 1)
  const previous: Article | null =
    index < articles.length - 1 ? articles[index + 1] : null;
  // 다음 글: 현재보다 최신 글 → index - 1 (경계 체크: index > 0)
  const next: Article | null = index > 0 ? articles[index - 1] : null;
  return {
    ...articles[index],
    previous,
    next,
  };
}
