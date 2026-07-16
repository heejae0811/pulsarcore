import Link from "next/link";
import { notFound } from "next/navigation";
import { performances } from "@/data/performances";

type PerformanceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return performances.map((performance) => ({
    slug: performance.slug,
  }));
}

export default async function PerformanceDetailPage({
  params,
}: PerformanceDetailPageProps) {
  const { slug } = await params;

  const performance = performances.find(
    (item) => item.slug === slug,
  );

  if (!performance) {
    notFound();
  }

  const currentIndex = performances.findIndex(
    (item) => item.slug === performance.slug,
  );

  const previousPerformance =
    performances[
      (currentIndex - 1 + performances.length) %
        performances.length
    ];

  const nextPerformance =
    performances[(currentIndex + 1) % performances.length];

  return (
    <main className="performance-detail-page">
      <section className="performance-detail-hero">
        <img
          src={performance.coverImage}
          alt={performance.title}
        />

        <div className="performance-detail-overlay" />

        <div className="performance-detail-title">
          <p>
            {performance.year} · {performance.category}
          </p>

          <h1>{performance.title}</h1>
          <span>{performance.koreanTitle}</span>
        </div>
      </section>

      <section className="performance-detail-about">
        <div>
          <p className="page-eyebrow">About the work</p>
          <h2>{performance.shortDescription}</h2>
        </div>

        <p>{performance.fullDescription}</p>
      </section>

      <section className="performance-information">
        <article>
          <span>Choreographer</span>
          <strong>{performance.choreographer}</strong>
        </article>

        <article>
          <span>Dancers</span>
          <strong>{performance.dancers}</strong>
        </article>

        <article>
          <span>Premiere</span>
          <strong>{performance.premiere}</strong>
        </article>

        <article>
          <span>Duration</span>
          <strong>{performance.duration}</strong>
        </article>
      </section>

      <section className="performance-detail-gallery">
        <div className="section-title">
          <p className="page-eyebrow">Performance gallery</p>
          <h2>무대의 장면들</h2>
        </div>

        <div className="detail-gallery-grid">
          {performance.gallery.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${performance.title} 공연 사진 ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="performance-detail-video">
        <div>
          <p className="page-eyebrow">Performance film</p>
          <h2>작품 영상</h2>
        </div>

        <div className="detail-video-frame">
          <iframe
            src={performance.videoUrl}
            title={`${performance.title} 공연 영상`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      <section className="performance-ticket-banner">
        <div>
          <p className="page-eyebrow">Ticket inquiry</p>
          <h2>이 작품을 무대에서 만나보세요.</h2>
        </div>

        <Link href="/ticket" className="primary-link">
          티켓 문의
          <span>↗</span>
        </Link>
      </section>

      <nav className="detail-pagination" aria-label="다른 작품">
        <Link href={`/performances/${previousPerformance.slug}`}>
          <span>← Previous work</span>
          <strong>{previousPerformance.title}</strong>
        </Link>

        <Link href="/performances" className="detail-list-link">
          전체 작품
        </Link>

        <Link href={`/performances/${nextPerformance.slug}`}>
          <span>Next work →</span>
          <strong>{nextPerformance.title}</strong>
        </Link>
      </nav>
    </main>
  );
}