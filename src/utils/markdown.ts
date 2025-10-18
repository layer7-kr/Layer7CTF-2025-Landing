export interface PostMetadata {
  title: string;
  date?: string;
  [key: string]: any;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

/**
 * 마크다운 파일의 frontmatter를 파싱합니다.
 */
export function parseFrontmatter(content: string): { metadata: PostMetadata; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {
      metadata: { title: '제목 없음' },
      content: content.trim()
    };
  }

  const frontmatter = match[1];
  const contentWithoutFrontmatter = match[2];

  // 간단한 YAML 파싱 (key: value 형태만 지원)
  const metadata: PostMetadata = { title: '제목 없음' };
  
  frontmatter.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && trimmedLine.includes(':')) {
      const [key, ...valueParts] = trimmedLine.split(':');
      const value = valueParts.join(':').trim();
      metadata[key.trim()] = value;
    }
  });

  return {
    metadata,
    content: contentWithoutFrontmatter.trim()
  };
}

/**
 * 파일명에서 슬러그를 생성합니다.
 */
export function generateSlug(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .replace(/[^a-zA-Z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

/**
 * 파일 수정 시간을 기반으로 날짜를 포맷팅합니다.
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * 마크다운을 HTML로 변환합니다.
 * marked 라이브러리가 필요합니다.
 */
export function markdownToHtml(markdown: string): string {
  // marked 라이브러리를 사용하여 마크다운을 HTML로 변환
  // 실제 구현에서는 import { marked } from 'marked'; 를 사용해야 합니다.
  
  // 임시로 간단한 변환 로직을 구현
  let html = markdown
    // 헤더 변환
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // 볼드 텍스트
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 이탤릭 텍스트
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // 리스트
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // 줄바꿈
    .replace(/\n/g, '<br>');
  
  return html;
}