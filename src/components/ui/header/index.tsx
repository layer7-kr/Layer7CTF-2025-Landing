import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Light } from "@/components/ui";
import { Link } from "@/data/link";

import Button from "../button";
import { HStack } from "../stack";
import Typo from "../typo";

import s from "./style.module.scss";

export default function Header() {
  const pathname = useLocation().pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={s.header}>
        <div className={s.header_wrap}>
          <ul className={s.header_menu}>
            <li>
              <a href="/" data-active={pathname === "/"}>
                <Typo.Body>CTF</Typo.Body>
              </a>
              <a href="/winners" data-active={pathname === "/winners"}>
                <Typo.Body>Winners</Typo.Body>
              </a>
              <a href="/authors" data-active={pathname === "/authors"}>
                <Typo.Body>Authors</Typo.Body>
              </a>
              <a href={Link.discord} target="_blank">
                <Typo.Body>Discord</Typo.Body>
                <ArrowUpRight />
              </a>
            </li>
          </ul>

          <a href="/" className={s.logo_link}>
            <img
              src="/layer7.svg"
              alt="Layer7 logo"
              className={s.header_logo}
            />
          </a>

          <HStack gap={10} className={s.header_buttons}>
            <a href="#contact">
              <Button variant="secondary" className={s.inquiry_button}>
                문의하기
              </Button>
            </a>
            <a href={Link.registration} target="_blank">
              <Button className={s.ctf_button}>Layer7 CTF 참가 신청하기</Button>
            </a>
          </HStack>

          <div className={s.mobile_right}>
            <a href={Link.registration} target="_blank">
              <Button className={s.mobile_ctf_button}>
                Layer7 CTF 참가 신청하기
              </Button>
            </a>
            <button className={s.hamburger_menu} onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 네비게이션 메뉴 */}
      <div
        className={`${s.mobile_nav} ${isMobileMenuOpen ? s.mobile_nav_open : ""}`}
      >
        <Light />
        <div className={s.mobile_nav_content}>
          <button className={s.mobile_nav_close} onClick={toggleMobileMenu}>
            <X size={24} />
          </button>

          <nav className={s.mobile_nav_menu}>
            <a href="/" className={pathname === "/" ? s.active : ""}>
              <Typo.Headline>CTF</Typo.Headline>
            </a>
            <a
              href="https://layer7.kr/"
              target="_blank"
              className={pathname === "/layer7" ? s.active : ""}
            >
              <Typo.Headline>Layer7</Typo.Headline>
            </a>
            <a
              href="winners"
              className={pathname === "/winners" ? s.active : ""}
            >
              <Typo.Headline>Winners</Typo.Headline>
            </a>
            <a
              href="/authors"
              className={pathname === "/authors" ? s.active : ""}
            >
              <Typo.Headline>Authors</Typo.Headline>
            </a>
            <a href={Link.discord} target="_blank">
              <Typo.Headline>Discord</Typo.Headline>
              <ArrowUpRight />
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
