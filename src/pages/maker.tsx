import { Light } from "@/components/ui";
import { Footer, Header, Spacing } from "@/components/ui";
import { MakersList } from "@/components/makers";

export default function Maker() {
  return (
    <>
      <Spacing size={64} />
      <Light />
      <Header />
      <div className="maker-page">
        <MakersList />
      </div>
      <Footer />
    </>
  );
}
