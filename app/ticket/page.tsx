"use client";

import { FormEvent, useState } from "react";

type SubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

type ApiResponse = {
  success?: boolean;
  message?: string;
};

export default function TicketPage() {
  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle");

  const [statusMessage, setStatusMessage] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (submitStatus === "submitting") {
      return;
    }

    setSubmitStatus("submitting");
    setStatusMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      ticketCount: Number(
        formData.get("ticketCount") ?? 1,
      ),
      performance: String(
        formData.get("performance") ?? "",
      ),
      message: String(formData.get("message") ?? ""),
      privacy: formData.get("privacy") === "on",
    };

    try {
      const response = await fetch("/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ?? "문의 전송에 실패했습니다.",
        );
      }

      setSubmitStatus("success");
      setStatusMessage(
        result.message ??
          "문의가 정상적으로 접수되었습니다.",
      );

      form.reset();
    } catch (error) {
      setSubmitStatus("error");

      setStatusMessage(
        error instanceof Error
          ? error.message
          : "문의 전송 중 오류가 발생했습니다.",
      );
    }
  }

  return (
    <main className="ticket-page">
      <section className="subpage-hero subpage-hero-dark">
        <p className="page-eyebrow">
          Ticket inquiry
        </p>

        <h1>
          무대에서
          <br />
          만나요.
        </h1>

        <p>
          아래 양식을 작성해 보내주시면 무용단에서 확인한 후
          이메일 또는 전화로 안내드립니다.
        </p>
      </section>

      <section className="ticket-form-section">
        <div className="ticket-information">
          <p className="page-eyebrow">
            Information
          </p>

          <h2>
            문의 전 확인해 주세요.
          </h2>

          <ul>
            <li>
              문의 접수 후 담당자가 수동으로 확인합니다.
            </li>

            <li>
              티켓 확정 내용은 이메일 또는 전화로 안내합니다.
            </li>

            <li>
              현재 홈페이지에서는 온라인 결제를 진행하지 않습니다.
            </li>

            <li>
              단체 관람은 문의 내용에 인원과 일정을 작성해 주세요.
            </li>
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

        <form
          className="ticket-form"
          onSubmit={handleSubmit}
        >
          <div className="ticket-form-row">
            <label>
              <span>이름 *</span>

              <input
                type="text"
                name="name"
                placeholder="이름을 입력해 주세요"
                maxLength={50}
                autoComplete="name"
                required
              />
            </label>

            <label>
              <span>이메일 *</span>

              <input
                type="email"
                name="email"
                placeholder="hello@example.com"
                maxLength={120}
                autoComplete="email"
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
                maxLength={30}
                autoComplete="tel"
                required
              />
            </label>

            <label>
              <span>티켓 수량 *</span>

              <input
                type="number"
                name="ticketCount"
                min={1}
                max={30}
                defaultValue={1}
                required
              />
            </label>
          </div>

          <label>
            <span>희망 공연 *</span>

            <select
              name="performance"
              defaultValue=""
              required
            >
              <option value="" disabled>
                공연을 선택해 주세요
              </option>

              <option value="pulsar">
                PULSAR
              </option>

              <option value="orbit">
                ORBIT
              </option>

              <option value="other">
                기타 문의
              </option>
            </select>
          </label>

          <label>
            <span>문의 내용</span>

            <textarea
              name="message"
              rows={7}
              maxLength={3000}
              placeholder="관람 희망 일정이나 문의 내용을 작성해 주세요."
            />
          </label>

          <label className="ticket-consent">
            <input
              type="checkbox"
              name="privacy"
              required
            />

            <span>
              문의 처리를 위한 개인정보 수집 및 이용에
              동의합니다.
            </span>
          </label>

          <button
            type="submit"
            className="ticket-submit-button"
            disabled={submitStatus === "submitting"}
          >
            {submitStatus === "submitting"
              ? "전송 중..."
              : "문의 보내기"}

            <span>
              {submitStatus === "submitting"
                ? "···"
                : "↗"}
            </span>
          </button>

          {statusMessage && (
            <p
              className={[
                "ticket-form-status",
                `ticket-form-status-${submitStatus}`,
              ].join(" ")}
              role="status"
              aria-live="polite"
            >
              {statusMessage}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}