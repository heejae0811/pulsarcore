"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigationItems = [
  {
    label: "홈",
    englishLabel: "Home",
    href: "/",
  },
  {
    label: "무용단 소개",
    englishLabel: "About",
    href: "/about",
  },
  {
    label: "무용수",
    englishLabel: "Dancers",
    href: "/dancers",
  },
  {
    label: "작품",
    englishLabel: "Performances",
    href: "/performances",
  },
  {
    label: "공연 준비 중",
    englishLabel: "Coming Soon",
    href: "/coming-soon",
  },
  {
    label: "티켓 문의",
    englishLabel: "Ticket",
    href: "/ticket",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  function isActivePage(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="site-header">
        <Link
          href="/"
          className="site-brand"
          aria-label="Pulsar Core 메인 페이지"
        >
          <span className="site-brand-symbol" aria-hidden="true">
            ✦
          </span>

          <span className="site-brand-text">
            <strong>PULSAR CORE</strong>
            <small>Contemporary Dance Company</small>
          </span>
        </Link>

        <nav className="desktop-navigation" aria-label="주요 메뉴">
          {navigationItems.map((item) => {
            const active = isActivePage(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "navigation-link active" : "navigation-link"}
                aria-current={active ? "page" : undefined}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={menuOpen ? "menu-button open" : "menu-button"}
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </header>

      <div
        id="mobile-navigation"
        className={menuOpen ? "mobile-navigation open" : "mobile-navigation"}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-navigation-decoration" aria-hidden="true">
          <span>✦</span>
          <span>✧</span>
          <span>·</span>
          <span>✦</span>
        </div>

        <nav aria-label="모바일 주요 메뉴">
          {navigationItems.map((item, index) => {
            const active = isActivePage(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "mobile-navigation-link active"
                    : "mobile-navigation-link"
                }
                aria-current={active ? "page" : undefined}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span className="mobile-navigation-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="mobile-navigation-label">
                  <strong>{item.label}</strong>
                  <small>{item.englishLabel}</small>
                </span>

                <span className="mobile-navigation-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mobile-navigation-footer">
          <p>Energy · Polarity · Movement</p>

          <div>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </>
  );
}