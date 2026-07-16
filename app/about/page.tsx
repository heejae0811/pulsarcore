export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="subpage-hero">
        <p className="page-eyebrow">About Pulsar Core</p>

        <h1>
          보이지 않는 힘을
          <br />
          움직임으로 번역합니다.
        </h1>

        <p>
          신체에 응축된 감정과 에너지가 다른 몸과 만나 새로운
          궤도를 만드는 순간을 탐구합니다.
        </p>
      </section>

      <section className="about-main">
        <div className="about-main-image">
          <img
            src="https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=2000&q=90"
            alt="Pulsar Core 무용단 공연"
          />
        </div>

        <div className="about-main-copy">
          <p className="page-eyebrow">Who we are</p>

          <p className="about-large-copy">
            Pulsar Core는 펄서의 응축된 에너지와 서로 다른
            극성에서 영감을 받은 컨템퍼러리 무용단입니다.
          </p>

          <p>
            우리는 신체에 축적된 감정, 기억과 긴장이 움직임으로
            방출되는 순간을 탐구합니다. 개인의 고유한 움직임이
            다른 신체와 충돌하고 연결되며 새로운 공간과 관계를
            만들어가는 과정을 무대 위에 담습니다.
          </p>
        </div>
      </section>

      <section className="about-values">
        <article>
          <span>01</span>
          <p className="page-eyebrow">Philosophy</p>
          <h2>응축과 해방</h2>
          <p>
            정지된 것처럼 보이는 몸 안에서 발생하는 미세한
            에너지와 폭발적인 전환에 주목합니다.
          </p>
        </article>

        <article>
          <span>02</span>
          <p className="page-eyebrow">Artistic Direction</p>
          <h2>신체와 공간의 궤도</h2>
          <p>
            서로 다른 움직임이 공간에서 만나고 분리되는 과정을
            하나의 시각적 궤도로 구성합니다.
          </p>
        </article>

        <article>
          <span>03</span>
          <p className="page-eyebrow">Vision</p>
          <h2>관객과의 연결</h2>
          <p>
            감각적이면서도 솔직한 작품을 통해 현대무용과 관객
            사이의 거리를 좁힙니다.
          </p>
        </article>

        <article>
          <span>04</span>
          <p className="page-eyebrow">Mission</p>
          <h2>새로운 움직임의 언어</h2>
          <p>
            다양한 신체와 예술 분야의 협업을 통해 동시대의
            감각을 담은 공연 언어를 개발합니다.
          </p>
        </article>
      </section>

      <section className="about-quote">
        <p aria-hidden="true">✦</p>

        <blockquote>
          “각자의 신체가 가진 고유한 빛이 서로를 비출 때,
          하나의 새로운 우주가 만들어집니다.”
        </blockquote>

        <span>Pulsar Core Artistic Statement</span>
      </section>

      <section className="about-history">
        <div>
          <p className="page-eyebrow">History</p>
          <h2>무용단의 궤적</h2>
        </div>

        <div className="history-list">
          <article>
            <strong>2026</strong>
            <div>
              <h3>PULSAR 신작 제작</h3>
              <p>창단 공연 및 신규 레퍼토리 개발</p>
            </div>
          </article>

          <article>
            <strong>2025</strong>
            <div>
              <h3>ORBIT 초연</h3>
              <p>서울 창작 공간 협력 프로젝트</p>
            </div>
          </article>

          <article>
            <strong>2024</strong>
            <div>
              <h3>Pulsar Core 창단</h3>
              <p>AFTERGLOW 창작 및 첫 쇼케이스 개최</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}