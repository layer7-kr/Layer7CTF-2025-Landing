import { Light } from "@/components/ui";
import { Footer, Header, Spacing } from "@/components/ui";
import { ArticleList } from "@/components/articles";

export default function Article() {
  return (
    <>
      <Spacing size={64} />
      <Light />
      <Header />
      <ArticleList />
      <Footer />
    </>
  );
}
