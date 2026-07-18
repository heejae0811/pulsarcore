"use client";

import Link from "next/link";

const footerNavigation = [
  { label: "홈", href: "/" },
  { label: "무용단 소개", href: "/about" },
  { label: "무용수", href: "/dancers" },
  { label: "작품", href: "/performances" },
  { label: "공연 준비 중", href: "/coming-soon" },
  { label: "티켓 문의", href: "/ticket" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-glow footer-glow-one" aria-hidden="true" />
      <div className="footer-glow footer-glow-two" aria-hidden="true" />

      <div className="footer-top">
        <div className="footer-identity">
          <Link href="/" className="footer-brand">
            <span className="footer-brand-symbol" aria-hidden="true">
              ✦
            </span>

            <span>
              <strong>PULSAR CORE</strong>
              <small>Contemporary Dance Company</small>
            </span>
          </Link>

          <p className="footer-statement">
            압축된 에너지를 움직임으로 해방하고,
            <br />
            서로 다른 신체가 만드는 새로운 궤도를 탐구합니다.
          </p>
        </div>

        <div className="footer-menu-area">
          <div className="footer-column">
            <p className="footer-column-title">Navigation</p>

            <nav className="footer-navigation" aria-label="푸터 메뉴">
              {footerNavigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Contact</p>

            <div className="footer-contact">
              <a href="mailto:pulsarcore@example.com">
                pulsarcore@example.com
              </a>

              <a href="tel:+821012345678">
                +82 10 1234 5678
              </a>

              <p>Seoul, Republic of Korea</p>
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Social</p>

            <div className="footer-social">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Pulsar Core. All rights reserved.
        </p>

        <p className="footer-keywords">
          Energy · Polarity · Movement
        </p>

        <button
          type="button"
          className="footer-top-button"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Back to top
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}