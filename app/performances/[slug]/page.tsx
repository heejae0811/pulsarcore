import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

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

type PortableTextBlock = {
  _key: string;
  _type: string;
  [key: string]: unknown;
};

type CastMember = {
  _id: string;
  name: string;
  englishName?: string;
  slug?: {
    current?: string;
  };
};

type Performance = {
  _id: string;
  title: string;
  englishTitle?: string;
  slug: {
    current: string;
  };
  category?: string;
  shortDescription?: string;
  description?: PortableTextBlock[];
  performanceDate?: string;
  endDate?: string;
  venue?: string;
  runningTime?: string;
  choreographer?: string;
  coverImage?: SanityImage;
  cast?: CastMember[];
  gallery?: SanityImage[];
  videoUrl?: string;
  ticketUrl?: string;
};

type PerformanceSummary = {
  _id: string;
  title: string;
  englishTitle?: string;
  slug: {
    current: string;
  };
};

type PerformanceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const performanceQuery = `
  *[
    _type == "performance" &&
    slug.current == $slug &&
    isActive == true
  ][0] {
    _id,
    title,
    englishTitle,
    slug,
    category,
    shortDescription,
    description,
    performanceDate,
    endDate,
    venue,
    runningTime,
    choreographer,
    coverImage,
    gallery,
    videoUrl,
    ticketUrl,
    cast[]-> {
      _id,
      name,
      englishName,
      slug
    }
  }
`;

const performanceNavigationQuery = `
  *[
    _type == "performance" &&
    isActive == true &&
    defined(slug.current)
  ] | order(order asc) {
    _id,
    title,
    englishTitle,
    slug
  }
`;

const performanceSlugsQuery = `
  *[
    _type == "performance" &&
    isActive == true &&
    defined(slug.current)
  ] {
    "slug": slug.current
  }
`;

const categoryMap: Record<string, string> = {
  repertoire: "레퍼토리",
  new: "신작",
  upcoming: "공연 예정",
  archive: "지난 공연",
};

export async function generateStaticParams() {
  const performances: { slug: string }[] = await client.fetch(
    performanceSlugsQuery,
  );

  return performances.map((performance) => ({
    slug: performance.slug,
  }));
}

export default async function PerformanceDetailPage({
  params,
}: PerformanceDetailPageProps) {
  const { slug } = await params;

  const [performance, performances]: [
    Performance | null,
    PerformanceSummary[],
  ] = await Promise.all([
    client.fetch(performanceQuery, { slug }),
    client.fetch(performanceNavigationQuery),
  ]);

  if (!performance) {
    notFound();
  }

  const currentIndex = performances.findIndex(
    (item) => item._id === performance._id,
  );

  const previousPerformance =
    currentIndex >= 0 && performances.length > 1
      ? performances[
          (currentIndex - 1 + performances.length) %
            performances.length
        ]
      : null;

  const nextPerformance =
    currentIndex >= 0 && performances.length > 1
      ? performances[
          (currentIndex + 1) % performances.length
        ]
      : null;

  const coverImageUrl = performance.coverImage?.asset?._ref
    ? urlFor(performance.coverImage)
        .width(1920)
        .height(1200)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  const category = performance.category
    ? categoryMap[performance.category] || performance.category
    : "";

  const performanceYear = performance.performanceDate
    ? new Date(performance.performanceDate).getFullYear()
    : "Date TBA";

  const performanceDateText = formatPerformanceDate(
    performance.performanceDate,
    performance.endDate,
  );

  const dancerNames =
    performance.cast
      ?.map((dancer) => dancer.englishName || dancer.name)
      .join(", ") || "미정";

  const videoEmbedUrl = getVideoEmbedUrl(performance.videoUrl);

  const validGalleryImages =
    performance.gallery?.filter(
      (image) => image.asset?._ref,
    ) || [];

  return (
    <main className="performance-detail-page">
      <section className="performance-detail-hero">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={
              performance.coverImage?.alt ||
              performance.title
            }
          />
        ) : (
          <div
            className="performance-image-placeholder"
            role="img"
            aria-label="대표 이미지 없음"
          >
            No image
          </div>
        )}

        <div className="performance-detail-overlay" />

        <div className="performance-detail-title">
          <p>
            {performanceYear}
            {category && ` · ${category}`}
          </p>

          <h1>
            {performance.englishTitle || performance.title}
          </h1>

          {performance.englishTitle && (
            <span>{performance.title}</span>
          )}
        </div>
      </section>

      <section className="performance-detail-about">
        <div>
          <p className="page-eyebrow">About the work</p>

          {performance.shortDescription && (
            <h2>{performance.shortDescription}</h2>
          )}
        </div>

        <div className="performance-detail-description">
          {performance.description?.length ? (
            <PortableText
              value={performance.description}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p>{children}</p>
                  ),
                  h2: ({ children }) => (
                    <h2>{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3>{children}</h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote>{children}</blockquote>
                  ),
                },
              }}
            />
          ) : (
            <p>작품 소개가 준비 중입니다.</p>
          )}
        </div>
      </section>

      <section className="performance-information">
        <article>
          <span>Choreographer</span>
          <strong>
            {performance.choreographer || "미정"}
          </strong>
        </article>

        <article>
          <span>Dancers</span>
          <strong>{dancerNames}</strong>
        </article>

        <article>
          <span>Performance</span>
          <strong>{performanceDateText}</strong>

          {performance.venue && (
            <small>{performance.venue}</small>
          )}
        </article>

        <article>
          <span>Duration</span>
          <strong>
            {performance.runningTime || "미정"}
          </strong>
        </article>
      </section>

      {validGalleryImages.length > 0 && (
        <section className="performance-detail-gallery">
          <div className="section-title">
            <p className="page-eyebrow">
              Performance gallery
            </p>
            <h2>무대의 장면들</h2>
          </div>

          <div className="detail-gallery-grid">
            {validGalleryImages.map((image, index) => {
              const galleryImageUrl = urlFor(image)
                .width(1400)
                .height(1000)
                .fit("crop")
                .auto("format")
                .url();

              return (
                <img
                  key={`${image.asset?._ref}-${index}`}
                  src={galleryImageUrl}
                  alt={
                    image.alt ||
                    `${performance.title} 공연 사진 ${
                      index + 1
                    }`
                  }
                />
              );
            })}
          </div>
        </section>
      )}

      {videoEmbedUrl && (
        <section className="performance-detail-video">
          <div>
            <p className="page-eyebrow">
              Performance film
            </p>
            <h2>작품 영상</h2>
          </div>

          <div className="detail-video-frame">
            <iframe
              src={videoEmbedUrl}
              title={`${performance.title} 공연 영상`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>
      )}

      <section className="performance-ticket-banner">
        <div>
          <p className="page-eyebrow">Ticket inquiry</p>
          <h2>이 작품을 무대에서 만나보세요.</h2>
        </div>

        {performance.ticketUrl ? (
          <a
            href={performance.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-link"
          >
            티켓 예매
            <span>↗</span>
          </a>
        ) : (
          <Link href="/ticket" className="primary-link">
            티켓 문의
            <span>↗</span>
          </Link>
        )}
      </section>

      <nav
        className="detail-pagination"
        aria-label="다른 작품"
      >
        {previousPerformance ? (
          <Link
            href={`/performances/${previousPerformance.slug.current}`}
          >
            <span>← Previous work</span>
            <strong>
              {previousPerformance.englishTitle ||
                previousPerformance.title}
            </strong>
          </Link>
        ) : (
          <span />
        )}

        <Link
          href="/performances"
          className="detail-list-link"
        >
          전체 작품
        </Link>

        {nextPerformance ? (
          <Link
            href={`/performances/${nextPerformance.slug.current}`}
          >
            <span>Next work →</span>
            <strong>
              {nextPerformance.englishTitle ||
                nextPerformance.title}
            </strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}

function formatPerformanceDate(
  startDate?: string,
  endDate?: string,
) {
  if (!startDate) {
    return "미정";
  }

  const start = new Date(startDate);

  const startText = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(start);

  if (!endDate || endDate === startDate) {
    return startText;
  }

  const end = new Date(endDate);

  const endText = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(end);

  return `${startText} – ${endText}`;
}

function getVideoEmbedUrl(videoUrl?: string) {
  if (!videoUrl) {
    return null;
  }

  try {
    const url = new URL(videoUrl);

    if (
      url.hostname === "youtu.be" ||
      url.hostname === "www.youtu.be"
    ) {
      const videoId = url.pathname.replace("/", "");

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    if (
      url.hostname.includes("youtube.com") &&
      url.pathname === "/watch"
    ) {
      const videoId = url.searchParams.get("v");

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    if (
      url.hostname.includes("youtube.com") &&
      url.pathname.startsWith("/embed/")
    ) {
      return videoUrl;
    }

    if (url.hostname.includes("vimeo.com")) {
      const videoId = url.pathname
        .split("/")
        .filter(Boolean)
        .pop();

      return videoId
        ? `https://player.vimeo.com/video/${videoId}`
        : null;
    }

    return videoUrl;
  } catch {
    return null;
  }
}