import Link from "next/link";
import { performances } from "@/data/performances";

export default function PerformancesPage() {
  return (
    <main className="performances-page">
      <section className="subpage-hero subpage-hero-dark">
        <p className="page-eyebrow">Performances</p>

        <h1>
          무대 위에 남겨진
          <br />
          빛과 움직임의 기록.
        </h1>

        <p>
          Pulsar Core가 창작한 현재와 과거의 작품을 소개합니다.
        </p>
      </section>

      <section className="performance-list-section">
        {performances.map((performance, index) => (
          <Link
            key={performance.slug}
            href={`/performances/${performance.slug}`}
            className="performance-list-card"
          >
            <span className="performance-list-index">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="performance-list-image">
              <img
                src={performance.coverImage}
                alt={performance.title}
              />
            </div>

            <div className="performance-list-copy">
              <div className="performance-list-meta">
                <span>{performance.year}</span>
                <span>{performance.category}</span>
              </div>

              <h2>{performance.title}</h2>
              <p className="performance-korean-title">
                {performance.koreanTitle}
              </p>

              <p>{performance.shortDescription}</p>

              <span className="performance-list-link">
                작품 자세히 보기
                <strong>↗</strong>
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}