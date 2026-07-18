import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type SanityImage = {
  _type?: "image";
  asset?: {
    _type?: "reference";
    _ref?: string;
  };
  alt?: string;
};

type Performance = {
  _id: string;
  title: string;
  englishTitle?: string;
  shortDescription?: string;
  category?: string;
  performanceDate?: string;
  coverImage?: SanityImage;
  slug?: {
    current?: string;
  };
};

const performancesQuery = `
  *[
    _type == "performance" &&
    isActive == true &&
    defined(slug.current)
  ] | order(order asc) {
    _id,
    title,
    englishTitle,
    shortDescription,
    category,
    performanceDate,
    coverImage,
    slug
  }
`;

const categoryMap: Record<string, string> = {
  repertoire: "레퍼토리",
  new: "신작",
  upcoming: "공연 예정",
  archive: "지난 공연",
};

export default async function PerformancesPage() {
  const performances: Performance[] = await client.fetch(
    performancesQuery,
  );

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
        {performances.length === 0 ? (
          <p>등록된 작품이 없습니다.</p>
        ) : (
          performances.map((performance, index) => {
            const slug = performance.slug?.current;

            const imageUrl = performance.coverImage?.asset?._ref
              ? urlFor(performance.coverImage)
                  .width(1200)
                  .height(800)
                  .fit("crop")
                  .auto("format")
                  .url()
              : null;

            const year = performance.performanceDate
              ? new Date(performance.performanceDate).getFullYear()
              : "Date TBA";

            const category = performance.category
              ? categoryMap[performance.category] ??
                performance.category
              : "";

            if (!slug) {
              return null;
            }

            return (
              <Link
                key={performance._id}
                href={`/performances/${slug}`}
                className="performance-list-card"
              >
                <span className="performance-list-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="performance-list-image">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={
                        performance.coverImage?.alt ||
                        performance.title
                      }
                    />
                  ) : (
                    <div
                      aria-label="이미지 없음"
                      role="img"
                      className="performance-image-placeholder"
                    >
                      No image
                    </div>
                  )}
                </div>

                <div className="performance-list-copy">
                  <div className="performance-list-meta">
                    <span>{year}</span>

                    {category && <span>{category}</span>}
                  </div>

                  <h2>
                    {performance.englishTitle ||
                      performance.title}
                  </h2>

                  {performance.englishTitle && (
                    <p className="performance-korean-title">
                      {performance.title}
                    </p>
                  )}

                  {performance.shortDescription && (
                    <p>{performance.shortDescription}</p>
                  )}

                  <span className="performance-list-link">
                    작품 자세히 보기
                    <strong>↗</strong>
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </section>
    </main>
  );
}