export default function TicketPage() {
  return (
    <main className="ticket-page">
      <section className="ticket-page-introduction">
        <div>
          <p className="page-eyebrow">Ticket inquiry</p>

          <h1>
            무대에서
            <br />
            만나요.
          </h1>

          <p>
            아래 양식을 작성해 보내주시면 무용단에서 확인한 후
            이메일 또는 전화로 안내드립니다.
          </p>
        </div>

        <div className="ticket-page-stars" aria-hidden="true">
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
        </div>
      </section>

      <section className="ticket-form-section">
        <div className="ticket-information">
          <p className="page-eyebrow">Information</p>

          <h2>문의 전 확인해 주세요.</h2>

          <ul>
            <li>문의 접수 후 담당자가 수동으로 확인합니다.</li>
            <li>티켓 확정 내용은 이메일 또는 전화로 안내합니다.</li>
            <li>현재 홈페이지에서는 온라인 결제를 진행하지 않습니다.</li>
            <li>단체 관람은 문의 내용에 인원과 일정을 작성해 주세요.</li>
          </ul>

          <div>
            <p>Contact</p>
            <a href="mailto:pulsarcore@example.com">
              pulsarcore@example.com
            </a>
            <a href="tel:+821012345678">
              +82 10 1234 5678
            </a>
          </div>
        </div>

        <form className="ticket-form">
          <div className="ticket-form-row">
            <label>
              <span>이름 *</span>
              <input
                type="text"
                name="name"
                placeholder="이름을 입력해 주세요"
                required
              />
            </label>

            <label>
              <span>이메일 *</span>
              <input
                type="email"
                name="email"
                placeholder="hello@example.com"
                required
              />
            </label>
          </div>

          <div className="ticket-form-row">
            <label>
              <span>연락처 *</span>
              <input
                type="tel"
                name="phone"
                placeholder="010-0000-0000"
                required
              />
            </label>

            <label>
              <span>티켓 수량 *</span>
              <input
                type="number"
                name="ticketCount"
                min="1"
                max="30"
                defaultValue="1"
                required
              />
            </label>
          </div>

          <label>
            <span>희망 공연 *</span>
            <select name="performance" defaultValue="" required>
              <option value="" disabled>
                공연을 선택해 주세요
              </option>
              <option value="pulsar">PULSAR</option>
              <option value="orbit">ORBIT</option>
              <option value="other">기타 문의</option>
            </select>
          </label>

          <label>
            <span>문의 내용</span>
            <textarea
              name="message"
              rows={7}
              placeholder="관람 희망 일정이나 문의 내용을 작성해 주세요."
            />
          </label>

          <label className="ticket-consent">
            <input type="checkbox" name="privacy" required />
            <span>
              문의 처리를 위한 개인정보 수집 및 이용에 동의합니다.
            </span>
          </label>

          <button type="submit" className="ticket-submit-button">
            문의 보내기
            <span>↗</span>
          </button>

          <p className="ticket-form-notice">
            현재는 화면 구성 단계이므로 버튼을 눌러도 실제 이메일이
            전송되지 않습니다.
          </p>
        </form>
      </section>
    </main>
  );
}