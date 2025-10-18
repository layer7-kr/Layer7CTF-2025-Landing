import { Footer, Header, Light, Spacing } from "@/components/ui";
import { WinnersList } from "@/components/winners";

export default function Winner() {
  return (
    <>
      <Spacing size={64} />
      <Light />
      <Header />
      <div className="winner-page">
        <WinnersList />
      </div>
      <Footer />
    </>
  );
}
