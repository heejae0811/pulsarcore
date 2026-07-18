import Link from "next/link";
import Reveal from "@/components/Reveal";
import { dancers } from "@/data/dancers";
import { performances } from "@/data/performances";

export default function HomePage() {
  const featuredDancers = dancers.slice(0, 3);
  const featuredPerformances = performances.slice(0, 2);

  return (
    <main className="home-page">
      <section className="home-hero">
          <img
            className="home-hero-image"
            src="https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?auto=format&fit=crop&w=2200&q=90"
            alt="Pulsar Core"
          />

          <div className="home-hero-overlay" />

          <div className="home-hero-content">
            <p className="page-eyebrow">
              Contemporary Dance Company · Seoul
            </p>

            <h1>
              압축된 에너지를
              <br />
              움직임으로 해방하다.
            </h1>

            <p className="home-hero-description">
              별의 잔광과 서로 다른 극성에서 출발한 움직임.
              <br />
              Pulsar Core는 신체에 축적된 감각을 무대 위의 파동으로
              변환합니다.
            </p>

            <div className="home-hero-actions">
              <Link href="/performances" className="primary-link">
                작품 보기
                <span>↗</span>
              </Link>

            <Link href="/about" className="secondary-link hero-secondary">
                무용단 이야기
                <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-dancers">
        <div className="section-title section-title-with-link">
          <div>
            <p className="page-eyebrow">Dancers</p>
            <h2>각자의 빛으로 하나의 파동을 만듭니다.</h2>
          </div>

          <Link href="/dancers" className="text-arrow-link">
            전체 무용수 보기
            <span>↗</span>
          </Link>
        </div>

        <div className="home-dancer-grid">
          {featuredDancers.map((dancer) => (
            <Link
              key={dancer.slug}
              href={`/dancers/${dancer.slug}`}
              className="dancer-preview-card"
            >
              <div className="dancer-preview-image">
                <img src={dancer.portraitImage} alt={dancer.name} />
              </div>

              <div className="dancer-preview-information">
                <div>
                  <h3>{dancer.name}</h3>
                  <p>{dancer.englishName}</p>
                </div>

                <span>{dancer.role}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-performances">
        <div className="section-title section-title-light">
          <p className="section-index">02</p>

          <div>
            <p className="page-eyebrow">Performances</p>
            <h2>
              무대 위에 남겨진
              <br />
              빛과 움직임의 기록.
            </h2>
          </div>
        </div>

        <div className="home-performance-list">
          {featuredPerformances.map((performance, index) => (
            <Link
              key={performance.slug}
              href={`/performances/${performance.slug}`}
              className="performance-preview-card"
            >
              <span className="performance-preview-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <img
                src={performance.coverImage}
                alt={performance.title}
              />

              <div>
                <p>
                  {performance.year} · {performance.category}
                </p>

                <h3>{performance.title}</h3>

                <span>
                  작품 자세히 보기
                  <strong>↗</strong>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/performances" className="light-outline-link">
          전체 작품 보기
          <span>↗</span>
        </Link>
      </section>

      <section className="home-coming-soon">
        <div>
          <p className="page-eyebrow">Coming soon</p>

          <h2>
            아직 이름 붙지 않은
            <br />
            움직임을 준비하고 있습니다.
          </h2>

          <p>
            연습실의 기록과 완성되기 전의 움직임을 공유합니다.
          </p>

          <Link href="/coming-soon" className="primary-link">
            준비 과정 보기
            <span>↗</span>
          </Link>
        </div>

        <div className="home-video">
          <iframe
            src="https://www.youtube.com/embed/ScMzIvxBSi4"
            title="Pulsar Core rehearsal"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      <section className="home-ticket">
        <p className="page-eyebrow">Ticket inquiry</p>

        <h2>무대에서 만나요.</h2>

        <p>
          공연 관람과 티켓에 관한 문의를 남겨주시면 확인 후
          개별적으로 안내드립니다.
        </p>

        <Link href="/ticket" className="primary-link">
          티켓 문의하기
          <span>↗</span>
        </Link>
      </section>
    </main>
  );
}