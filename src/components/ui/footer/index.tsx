import { ArrowUpRight } from "lucide-react";

import { Link } from "@/data/link";

import Section from "../section";
import { FlexAlign, HStack, VStack } from "../stack";
import Typo from "../typo";

import s from "./style.module.scss";

export default function Footer() {
  return (
    <Section padding={32}>
      <footer className={s.footer}>
        <VStack className={s.footer_content} gap={24}>
          <HStack gap={8} align={FlexAlign.Center}>
            <img
              src="/layer7.svg"
              alt="Layer7 logo"
              className={s.footer_logo}
            />
            <Typo.BodyLarge>Layer7</Typo.BodyLarge>
          </HStack>
          <Typo.Body className={s.footer_address}>
            선린인터넷고등학교 정보보호과 해킹 전공동아리
            <br />
            Email. ctf@layer7.kr
          </Typo.Body>
          <Typo.Subtext className={s.footer_copyright}>
            © 2025 Layer7, Hacking Club. All Rights Reserved.
          </Typo.Subtext>
        </VStack>
        <HStack gap={10} align={FlexAlign.End} className={s.footer_right}>
          <VStack gap={10}>
            <a href={Link.instagram} target="_blank" className={s.creator_link}>
              <HStack gap={4}>
                <Typo.Body>Instagram</Typo.Body>
                <ArrowUpRight size={18} />
              </HStack>
            </a>
            <a href={Link.github} target="_blank" className={s.creator_link}>
              <HStack gap={4}>
                <Typo.Body>Github</Typo.Body>
                <ArrowUpRight size={18} />
              </HStack>
            </a>
          </VStack>
          <VStack gap={10}>
            <a href={Link.facebook} target="_blank" className={s.creator_link}>
              <HStack gap={4}>
                <Typo.Body>Facebook</Typo.Body>
                <ArrowUpRight size={18} />
              </HStack>
            </a>
            <a href={Link.blog} target="_blank" className={s.creator_link}>
              <HStack gap={4}>
                <Typo.Body>Blog</Typo.Body>
                <ArrowUpRight size={18} />
              </HStack>
            </a>
          </VStack>
        </HStack>
      </footer>
    </Section>
  );
}
