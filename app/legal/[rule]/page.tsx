import { notFound } from "next/navigation";
import { NavLinks } from "../ui";
import PrivacyContent from "../PrivacyContent";
import TermsContent from "../TermsContent";

type AllowedRules = "privacy" | "terms";

type Props = {
  params: Promise<{
    rule: string;
  }>;
};

export default async function LegalPage({ params }: Props) {
  const { rule } = await params;

  // 2. Security guard: standard 404 if the URL segment isn't valid
  const validRules: AllowedRules[] = ["privacy", "terms"];
  if (!validRules.includes(rule as AllowedRules)) {
    notFound();
  }

  function renderRule() {
    if ((rule as AllowedRules) === "privacy") return <PrivacyContent />;
    return <TermsContent />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#080d1a",
        fontFamily: "'Inter', sans-serif",
        color: "#f0f4ff",
      }}
    >
      {/* Subtle top gradient glow */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "400px",
          background:
            "radial-gradient(ellipse 60% 300px at 50% -60px, rgba(99,102,241,0.12) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "880px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Header */}
        <header style={{ paddingTop: "3.5rem", paddingBottom: "2.5rem" }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "1.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "#3d4f7a",
                letterSpacing: "0.02em",
              }}
            >
              Academiq
            </span>
            <span style={{ color: "#2a3556", fontSize: "0.75rem" }}>/</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "#6366f1",
                letterSpacing: "0.02em",
              }}
            >
              Legal
            </span>
          </div>

          {/* Page title */}
          <h1
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#f0f4ff",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
              marginBottom: "1rem",
            }}
          >
            {rule.toUpperCase()}
          </h1>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "#6b7fa3",
              lineHeight: "1.7",
              maxWidth: "560px",
            }}
          >
            Academiq is committed to protecting your privacy and providing a
            transparent, trustworthy learning environment. These documents
            describe how we handle your information and the terms governing your
            use of the platform.
          </p>
        </header>

        {/* Main Content Card */}
        <main>
          <div
            style={{
              backgroundColor: "#0f1629",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "22px",
              padding: "clamp(1.75rem, 5vw, 3rem)",
              boxShadow:
                "0 4px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(99,102,241,0.04)",
              marginBottom: "2.5rem",
            }}
          >
            {renderRule()}
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "1.75rem",
            paddingBottom: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontSize: "0.8125rem",
              color: "#3d4f7a",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.02em",
            }}
          >
            © 2025 Academiq
          </span>
          <NavLinks />
        </footer>
      </div>
    </div>
  );
}
