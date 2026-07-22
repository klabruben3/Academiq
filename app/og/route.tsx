import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Academiq";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function Progress({ width, color }: { width: number; color: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: 8,
        background: "rgba(255,255,255,.05)",
        borderRadius: 999,
        overflow: "hidden",
        display: "flex",
      }}
    >
      <div
        style={{
          width: `${width}%`,
          height: "100%",
          background: color,
          borderRadius: 999,
        }}
      />
    </div>
  );
}

function Card({
  title,
  value,
  progress,
}: {
  title: string;
  value: string;
  progress: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 18,
        borderRadius: 18,
        background: "#141b2d",
        border: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 18,
            color: "#a0aec0",
          }}
        >
          {title}
        </span>

        <span
          style={{
            fontSize: 18,
            color: "#f0f4ff",
            fontWeight: 700,
          }}
        >
          {value}
        </span>
      </div>

      <Progress width={progress} color="#6366f1" />
    </div>
  );
}

function Home({ iconUrl }: { iconUrl: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",

        background: "#080d1a",
        color: "#f0f4ff",

        fontFamily: "Inter",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: 0.5,
          backgroundImage: `
          linear-gradient(rgba(255, 74, 9, 0.71) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 204, 0, 0.05) 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          right: 130,
          top: -80,
          marginTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <img src={iconUrl} width={700} height={700} alt="Academiq" />
      </div>

      {/* Glow */}

      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          right: -200,
          top: -220,
          background:
            "radial-gradient(circle, rgba(99,102,241,.22), transparent 70%)",
        }}
      />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 60,
        }}
      >
        {/* LEFT */}

        <div
          style={{
            width: 560,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              color: "#818cf8",
              fontWeight: 700,
              letterSpacing: 8,
              fontSize: 20,
            }}
          >
            ACADEMIQ
          </span>

          <span
            style={{
              marginTop: 32,
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 0.95,
            }}
          >
            Your academic
          </span>

          <span
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 0.95,
            }}
          >
            workspace.
          </span>

          <span
            style={{
              marginTop: 32,
              fontSize: 28,
              lineHeight: 1.45,
              color: "#a0aec0",
            }}
          >
            Track modules, manage assessments, plan study sessions and stay
            ahead of every deadline.
          </span>

          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 40,
            }}
          >
            {["Modules", "Assessments", "AI Assistant"].map((pill) => (
              <div
                key={pill}
                style={{
                  padding: "12px 22px",
                  borderRadius: 999,
                  background: "rgba(99,102,241,.12)",
                  border: "1px solid rgba(99,102,241,.3)",
                  color: "#a5b4fc",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {pill}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}

        <div
          style={{
            width: 420,
            padding: 28,
            borderRadius: 28,

            display: "flex",
            flexDirection: "column",
            gap: 18,

            background: "#0f1629",

            border: "1px solid rgba(255,255,255,.06)",

            boxShadow: "0 40px 100px rgba(0,0,0,.35)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              Semester 2
            </span>

            <div
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                background: "rgba(99,102,241,.15)",
                color: "#a5b4fc",
                fontSize: 14,
              }}
            >
              4 Modules
            </div>
          </div>

          <Card title="Mathematics" value="84%" progress={84} />

          <Card title="Physics" value="71%" progress={71} />

          <Card title="Programming" value="92%" progress={92} />
        </div>
      </div>
    </div>
  );
}

export async function GET() {
  return new ImageResponse(
    <Home iconUrl="https://academiq-nwu.vercel.app/logo-3d.png" />,
    size,
  );
}
