import { BulletList, Divider, Paragraph, SectionHeading } from "./ui";

const LAST_UPDATED_PRIVACY = "January 15, 2025";

export default function PrivacyContent() {
  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#f0f4ff",
              letterSpacing: "-0.02em",
            }}
          >
            Privacy Policy
          </h1>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              fontWeight: 500,
              color: "#6366f1",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              borderRadius: "6px",
              padding: "0.2rem 0.6rem",
              letterSpacing: "0.04em",
            }}
          >
            Last updated {LAST_UPDATED_PRIVACY}
          </span>
        </div>
        <p style={{ fontSize: "1rem", color: "#6b7fa3", lineHeight: "1.7" }}>
          This policy explains how Academiq collects, uses, and protects your
          information when you use our platform.
        </p>
      </div>

      <Divider />

      <div>
        <SectionHeading>1. Information We Collect</SectionHeading>
        <Paragraph>
          Academiq collects information you provide directly to us, as well as
          information we collect automatically when you use our service. We
          limit collection to what is necessary to provide and improve the
          platform.
        </Paragraph>
        <BulletList
          items={[
            "Account information: name, email address, and profile picture provided via Google Sign-In",
            "Academic profile: grade level, subjects of interest, learning goals, and study preferences",
            "Usage data: features accessed, sessions completed, and performance metrics within the platform",
            "Device and technical data: browser type, operating system, and anonymized IP address for security purposes",
          ]}
        />

        <SectionHeading>2. How We Use Information</SectionHeading>
        <Paragraph>
          We use the information we collect to operate, maintain, and improve
          Academiq. Your data is never sold to third parties and is used solely
          to enhance your learning experience.
        </Paragraph>
        <BulletList
          items={[
            "Personalize your learning dashboard and AI-generated study recommendations",
            "Track academic progress and generate insights to support your goals",
            "Communicate product updates, feature announcements, and support messages",
            "Detect and prevent fraud, abuse, and security incidents",
            "Comply with legal obligations and enforce our Terms of Service",
          ]}
        />

        <SectionHeading>3. Google Sign-In</SectionHeading>
        <Paragraph>
          Academiq uses Google OAuth 2.0 for authentication. When you sign in
          with Google, we receive your name, email address, and profile picture
          as shared by Google. We do not receive your Google password, and we do
          not access any Google services beyond what you explicitly authorize.
        </Paragraph>
        <Paragraph>
          You can revoke Academiq's access to your Google account at any time
          through your Google Account security settings. Revoking access will
          sign you out of Academiq and may limit certain functionality.
        </Paragraph>

        <SectionHeading>4. Student Profile Information</SectionHeading>
        <Paragraph>
          Academic profile data — including subjects, grades, study goals, and
          performance history — is stored securely and used exclusively to
          personalize your experience. This data is not shared with educational
          institutions, parents, or any third parties without your explicit
          consent.
        </Paragraph>

        <SectionHeading>5. AI Features</SectionHeading>
        <Paragraph>
          Academiq uses AI to generate study plans, practice questions, and
          personalized feedback. Your interactions with AI features may be used
          to improve the quality and accuracy of AI-generated content. Inputs to
          AI features are processed by our infrastructure and may be reviewed by
          our team for quality assurance purposes.
        </Paragraph>
        <Paragraph>
          We do not use your personal information to train third-party AI
          models. AI-generated content is not a substitute for professional
          academic advice.
        </Paragraph>

        <SectionHeading>6. Data Storage</SectionHeading>
        <Paragraph>
          Your data is stored on secure servers located in the United States. We
          use industry-standard encryption in transit (TLS 1.3) and at rest
          (AES-256). Data is retained for the duration of your account and for
          up to 90 days following account deletion, after which it is
          permanently purged from our systems.
        </Paragraph>

        <SectionHeading>7. Data Security</SectionHeading>
        <Paragraph>
          We implement technical and organizational measures designed to protect
          your information against unauthorized access, alteration, disclosure,
          or destruction. These include access controls, audit logging, regular
          security reviews, and employee training.
        </Paragraph>
        <Paragraph>
          No method of transmission over the internet is 100% secure. While we
          strive to protect your information, we cannot guarantee absolute
          security and encourage you to use a strong, unique password and enable
          two-factor authentication where available.
        </Paragraph>

        <SectionHeading>8. Your Rights</SectionHeading>
        <Paragraph>
          Depending on your location, you may have certain rights regarding your
          personal information.
        </Paragraph>
        <BulletList
          items={[
            "Access: request a copy of the personal information we hold about you",
            "Correction: request that we correct inaccurate or incomplete information",
            "Deletion: request that we delete your account and associated data",
            "Portability: request an export of your data in a structured, machine-readable format",
            "Objection: object to certain uses of your information, including for marketing",
          ]}
        />
        <Paragraph>
          To exercise any of these rights, contact us at the address below. We
          will respond within 30 days.
        </Paragraph>

        <SectionHeading>9. Contact Information</SectionHeading>
        <Paragraph>
          For questions about this Privacy Policy or your personal data, please
          contact us at:
        </Paragraph>
        <div
          style={{
            backgroundColor: "rgba(99, 102, 241, 0.06)",
            border: "1px solid rgba(99, 102, 241, 0.15)",
            borderRadius: "12px",
            padding: "1.25rem 1.5rem",
            marginTop: "0.5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              color: "#8b9cc8",
              lineHeight: "1.8",
              margin: 0,
            }}
          >
            Academiq Privacy Team
            <br />
            <span style={{ color: "#6366f1" }}>privacy@academiq.app</span>
            <br />
            We typically respond within 2–3 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
