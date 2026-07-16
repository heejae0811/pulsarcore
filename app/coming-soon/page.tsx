const rehearsalContents = [
  {
    title: "Gravity Practice No. 03",
    date: "2026.07",
    description:
      "중력에 저항하지 않고 몸이 기울어지는 방향을 따라가 보는 움직임 연구입니다.",
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Breathing Together",
    date: "2026.06",
    description:
      "서로 다른 호흡의 속도가 하나의 리듬으로 연결되는 과정을 실험합니다.",
    image:
      "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Distance and Orbit",
    date: "2026.05",
    description:
      "두 신체 사이의 거리가 움직임의 강도와 방향을 어떻게 변화시키는지 탐색합니다.",
    image:
      "https://images.unsplash.com/photo-1495791185843-c73f2269f669?auto=format&fit=crop&w=1600&q=85",
  },
];

export default function ComingSoonPage() {
  return (
    <main className="coming-soon-page">
      <section className="subpage-hero coming-soon-hero">
        <p className="page-eyebrow">Coming soon · Behind the scenes</p>

        <h1>
          아직 이름 붙지 않은
          <br />
          움직임을 준비합니다.
        </h1>

        <p>
          완성된 공연뿐 아니라 연습실에서 발견되는 가볍고
          솔직한 순간도 함께 나눕니다.
        </p>
      </section>

      <section className="coming-featured-video">
        <div className="detail-video-frame">
          <iframe
            src="https://www.youtube.com/embed/ScMzIvxBSi4"
            title="Pulsar Core rehearsal video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="coming-featured-copy">
          <p className="coming-handwriting">Work in progress ✦</p>

          <p className="page-eyebrow">New creation · 2026</p>

          <h2>Gravity Practice No. 03</h2>

          <p>
            몸이 무너지기 직전의 균형과 다시 중심을 찾아가는
            순간을 관찰합니다. 작은 움직임들이 어떤 작품으로
            발전할지 지켜봐 주세요.
          </p>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
            className="text-arrow-link"
          >
            YouTube에서 더 보기
            <span>↗</span>
          </a>
        </div>
      </section>

      <section className="rehearsal-archive">
        <div className="section-title">
          <p className="page-eyebrow">Rehearsal archive</p>
          <h2>연습실의 기록</h2>
        </div>

        <div className="rehearsal-grid">
          {rehearsalContents.map((content, index) => (
            <article key={content.title} className="rehearsal-card">
              <div>
                <img src={content.image} alt={content.title} />
              </div>

              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{content.date}</p>
              <h3>{content.title}</h3>
              <p>{content.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}