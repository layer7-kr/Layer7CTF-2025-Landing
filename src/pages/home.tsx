import {
  About,
  Calendar,
  CompetitionAbout,
  Contact,
  FormAbout,
  Gallery,
  Hero,
  Merit,
  Money,
  Sponsor,
} from "@/components/home";
import { Header, Light } from "@/components/ui";
import Footer from "@/components/ui/footer";
import Spacing from "@/components/ui/spacing";

export default function Home() {
  return (
    <>
      <Spacing size={64} />
      <Light />
      <Header />
      <Hero />
      <Sponsor />
      <About />
      <Merit
        text="재학생과 졸업생이 함께하는 대회"
        description="선린인터넷고등학교 재학생과 졸업생이 함께 출제하여 높은 퀄리티의 문제를 제공합니다."
        image="/images/merit/n1.png"
      />
      <Merit
        text="다양한 해킹 분야의 문제"
        description="Web, Reversing, Pwnable, AI, Misc 총 5개의 분야에 문제가 출제됩니다."
        image="/images/merit/n2.png"
        reversed
      />
      <Calendar />
      <FormAbout />
      <CompetitionAbout />
      <Money />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}
