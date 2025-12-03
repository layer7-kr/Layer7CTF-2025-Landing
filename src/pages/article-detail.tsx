import { Light } from "@/components/ui";
import { Footer, Header, Spacing } from "@/components/ui";
import { ArticleDetail as ArticleDetailComponent } from "@/components/articles";

export default function ArticleDetail() {
  return (
    <>
      <Spacing size={64} />
      <Light />
      <Header />
      <ArticleDetailComponent />
      <Footer />
    </>
  );
}
