import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { Section, Typo } from "@/components/ui";
import { FlexAlign, FlexJustify, HStack, VStack } from "@/components/ui/stack";

import s from "./style.module.scss";

// 갤러리 이미지들을 동적으로 가져오기
const galleryModules = import.meta.glob(
  "/public/images/gallery/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    as: "url",
  },
);

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 갤러리 이미지 배열 생성
  const galleryImages = useMemo(() => {
    return Object.entries(galleryModules).map(([path, url], index) => {
      const fileName = path.split("/").pop()?.split(".")[0] || "";
      return {
        id: `gallery-${index + 1}`,
        src: url as string,
        alt: `갤러리 이미지 ${index + 1}`,
        title: fileName
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
      };
    });
  }, []);

  // 다음 이미지로 이동
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  // 이전 이미지로 이동
  const goToPrevious = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  }, [galleryImages.length]);

  // 특정 인덱스로 이동
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <Section>
      <div className={s.gallery_container}>
        <div>
          <Typo.Headline>갤러리</Typo.Headline>
        </div>
        <div style={{ width: "100%" }}>
          <VStack gap={24} fullWidth>
            <div className={s.image_container} tabIndex={0}>
              <img
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                className={s.image}
                loading="lazy"
              />
            </div>

            <HStack
              fullWidth
              justify={FlexJustify.Between}
              align={FlexAlign.Center}
            >
              <button
                className={s.arrow}
                onClick={goToPrevious}
                aria-label="이전 이미지"
              >
                <ArrowLeft />
              </button>

              <HStack gap={12}>
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    className={`${s.dot} ${index === currentIndex ? s.active : ""}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`${index + 1}번째 이미지로 이동`}
                  />
                ))}
              </HStack>

              <button
                className={s.arrow}
                onClick={goToNext}
                aria-label="다음 이미지"
              >
                <ArrowRight />
              </button>
            </HStack>
          </VStack>
        </div>
      </div>
    </Section>
  );
}
