import Link from "next/link";
import { notFound } from "next/navigation";
import { dancers } from "@/data/dancers";

type DancerDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return dancers.map((dancer) => ({
    slug: dancer.slug,
  }));
}

export default async function DancerDetailPage({
  params,
}: DancerDetailPageProps) {
  const { slug } = await params;

  const dancer = dancers.find((item) => item.slug === slug);

  if (!dancer) {
    notFound();
  }

  const currentIndex = dancers.findIndex(
    (item) => item.slug === dancer.slug,
  );

  const previousDancer =
    dancers[(currentIndex - 1 + dancers.length) % dancers.length];

  const nextDancer =
    dancers[(currentIndex + 1) % dancers.length];

  return (
    <main className="dancer-detail-page">
      <section className="dancer-detail-hero">
        <img src={dancer.coverImage} alt={dancer.name} />

        <div className="dancer-detail-overlay" />

        <div className="dancer-detail-title">
          <p>{dancer.role}</p>
          <h1>{dancer.name}</h1>
          <span>{dancer.englishName}</span>
        </div>
      </section>

      <section className="dancer-detail-introduction">
        <article>
          <p className="page-eyebrow">Biography</p>
          <p>{dancer.biography}</p>
        </article>

        <article>
          <p className="page-eyebrow">Artistic statement</p>
          <p>{dancer.artisticStatement}</p>
        </article>
      </section>

      <section className="dancer-detail-gallery">
        <div className="section-title">
          <p className="page-eyebrow">Gallery</p>
          <h2>움직임의 순간</h2>
        </div>

        <div className="detail-gallery-grid">
          {dancer.gallery.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${dancer.name} 공연 사진 ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="dancer-detail-video">
        <div>
          <p className="page-eyebrow">Performance video</p>
          <h2>
            무대 위의
            <br />
            움직임을 만나보세요.
          </h2>
        </div>

        <div className="detail-video-frame">
          <iframe
            src={dancer.videoUrl}
            title={`${dancer.name} 공연 영상`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      <nav className="detail-pagination" aria-label="다른 무용수">
        <Link href={`/dancers/${previousDancer.slug}`}>
          <span>← Previous dancer</span>
          <strong>{previousDancer.name}</strong>
        </Link>

        <Link href="/dancers" className="detail-list-link">
          전체 무용수
        </Link>

        <Link href={`/dancers/${nextDancer.slug}`}>
          <span>Next dancer →</span>
          <strong>{nextDancer.name}</strong>
        </Link>
      </nav>
    </main>
  );
}