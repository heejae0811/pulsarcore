import Link from "next/link";
import { dancers } from "@/data/dancers";

export default function DancersPage() {
  return (
    <main className="dancers-page">
      <section className="subpage-hero">
        <p className="page-eyebrow">Dancers</p>

        <h1>
          각자의 빛으로
          <br />
          하나의 파동을 만듭니다.
        </h1>

        <p>
          인물을 선택하면 무용수의 사진, 활동 이야기와 공연
          영상을 볼 수 있습니다.
        </p>
      </section>

      <section className="dancer-list-section">
        <div className="dancer-list">
          {dancers.map((dancer, index) => (
            <Link
              key={dancer.slug}
              href={`/dancers/${dancer.slug}`}
              className="dancer-list-card"
            >
              <div className="dancer-list-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="dancer-list-image">
                <img src={dancer.portraitImage} alt={dancer.name} />

                <div className="dancer-list-hover">
                  <span>View profile</span>
                  <span>↗</span>
                </div>
              </div>

              <div className="dancer-list-information">
                <p>{dancer.role}</p>
                <h2>{dancer.name}</h2>
                <span>{dancer.englishName}</span>
                <p>{dancer.shortIntroduction}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}