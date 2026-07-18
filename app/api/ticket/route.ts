import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type TicketRequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  ticketCount?: string | number;
  performance?: string;
  message?: string;
  privacy?: boolean;
  website?: string;
};

const performanceNames: Record<string, string> = {
  pulsar: "PULSAR",
  orbit: "ORBIT",
  other: "기타 문의",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !adminEmail || !fromEmail) {
      console.error("Resend 환경변수가 설정되지 않았습니다.");

      return NextResponse.json(
        {
          success: false,
          message: "메일 서버 설정이 완료되지 않았습니다.",
        },
        { status: 500 },
      );
    }

    const body = (await request.json()) as TicketRequestBody;

    /*
     * 사용자가 볼 수 없는 입력란입니다.
     * 자동 입력 봇이 값을 채운 경우 요청을 정상 처리한 것처럼 종료합니다.
     */
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const name = normalizeText(body.name, 50);
    const email = normalizeText(body.email, 120);
    const phone = normalizeText(body.phone, 30);
    const performance = normalizeText(body.performance, 50);
    const message = normalizeText(body.message, 3000);

    const parsedTicketCount = Number(body.ticketCount);
    const ticketCount = Number.isInteger(parsedTicketCount)
      ? parsedTicketCount
      : 0;

    if (!name || !email || !phone || !performance) {
      return NextResponse.json(
        {
          success: false,
          message: "필수 입력 항목을 모두 작성해 주세요.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "올바른 이메일 주소를 입력해 주세요.",
        },
        { status: 400 },
      );
    }

    if (ticketCount < 1 || ticketCount > 30) {
      return NextResponse.json(
        {
          success: false,
          message: "티켓 수량은 1장부터 30장까지 선택할 수 있습니다.",
        },
        { status: 400 },
      );
    }

    if (body.privacy !== true) {
      return NextResponse.json(
        {
          success: false,
          message: "개인정보 수집 및 이용에 동의해 주세요.",
        },
        { status: 400 },
      );
    }

    const performanceName =
      performanceNames[performance] ?? performance;

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],

      /*
       * 관리자가 이메일에서 바로 답장하면
       * 문의자가 입력한 이메일로 전송됩니다.
       */
      replyTo: email,

      subject: `[Pulsar Core 티켓 문의] ${name} · ${performanceName}`,

      text: [
        "새로운 티켓 문의가 접수되었습니다.",
        "",
        `이름: ${name}`,
        `이메일: ${email}`,
        `연락처: ${phone}`,
        `희망 공연: ${performanceName}`,
        `티켓 수량: ${ticketCount}장`,
        "",
        "문의 내용:",
        message || "작성된 문의 내용이 없습니다.",
      ].join("\n"),

      html: `
        <div
          style="
            max-width: 640px;
            margin: 0 auto;
            padding: 36px;
            background: #fbfbff;
            color: #171130;
            font-family: Arial, 'Apple SD Gothic Neo', sans-serif;
          "
        >
          <p
            style="
              margin: 0 0 12px;
              color: #2388ff;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.16em;
              text-transform: uppercase;
            "
          >
            Pulsar Core
          </p>

          <h1
            style="
              margin: 0 0 32px;
              font-size: 28px;
              line-height: 1.35;
            "
          >
            새로운 티켓 문의가 접수되었습니다.
          </h1>

          <table
            style="
              width: 100%;
              border-collapse: collapse;
              background: #ffffff;
            "
          >
            <tbody>
              <tr>
                <th style="${tableHeaderStyle}">이름</th>
                <td style="${tableCellStyle}">
                  ${escapeHtml(name)}
                </td>
              </tr>

              <tr>
                <th style="${tableHeaderStyle}">이메일</th>
                <td style="${tableCellStyle}">
                  <a href="mailto:${escapeHtml(email)}">
                    ${escapeHtml(email)}
                  </a>
                </td>
              </tr>

              <tr>
                <th style="${tableHeaderStyle}">연락처</th>
                <td style="${tableCellStyle}">
                  <a href="tel:${escapeHtml(phone)}">
                    ${escapeHtml(phone)}
                  </a>
                </td>
              </tr>

              <tr>
                <th style="${tableHeaderStyle}">희망 공연</th>
                <td style="${tableCellStyle}">
                  ${escapeHtml(performanceName)}
                </td>
              </tr>

              <tr>
                <th style="${tableHeaderStyle}">티켓 수량</th>
                <td style="${tableCellStyle}">
                  ${ticketCount}장
                </td>
              </tr>
            </tbody>
          </table>

          <div
            style="
              margin-top: 24px;
              padding: 24px;
              background: #ffffff;
              border: 1px solid rgba(35, 22, 99, 0.12);
            "
          >
            <p
              style="
                margin: 0 0 12px;
                color: #2388ff;
                font-size: 11px;
                font-weight: 700;
              "
            >
              문의 내용
            </p>

            <p
              style="
                margin: 0;
                white-space: pre-wrap;
                font-size: 14px;
                line-height: 1.8;
              "
            >${escapeHtml(
              message || "작성된 문의 내용이 없습니다.",
            )}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend 전송 오류:", error);

      return NextResponse.json(
        {
          success: false,
          message:
            "문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "문의가 정상적으로 접수되었습니다.",
      emailId: data?.id,
    });
  } catch (error) {
    console.error("티켓 문의 API 오류:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      },
      { status: 500 },
    );
  }
}

const tableHeaderStyle = [
  "width: 120px",
  "padding: 16px",
  "border: 1px solid rgba(35, 22, 99, 0.12)",
  "background: #f4f1ff",
  "font-size: 13px",
  "text-align: left",
  "vertical-align: top",
].join(";");

const tableCellStyle = [
  "padding: 16px",
  "border: 1px solid rgba(35, 22, 99, 0.12)",
  "font-size: 14px",
  "line-height: 1.6",
].join(";");