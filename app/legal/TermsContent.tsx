import { BulletList, Divider, Paragraph, SectionHeading } from "./ui";

const LAST_UPDATED_TERMS = "January 15, 2025";

export default function TermsContent() {
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
            Terms of Service
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
            Last updated {LAST_UPDATED_TERMS}
          </span>
        </div>
        <p style={{ fontSize: "1rem", color: "#6b7fa3", lineHeight: "1.7" }}>
          These terms govern your use of Academiq. By accessing or using our
          platform, you agree to be bound by these terms.
        </p>
      </div>

      <Divider />

      <SectionHeading>1. Acceptance of Terms</SectionHeading>
      <Paragraph>
        By creating an account or otherwise accessing Academiq, you confirm that
        you have read, understood, and agree to these Terms of Service and our
        Privacy Policy. If you do not agree, you must not use the platform.
      </Paragraph>
      <Paragraph>
        If you are under 13 years of age, you may not use Academiq. If you are
        between 13 and 18, you may use Academiq only with the consent of a
        parent or legal guardian who agrees to these terms on your behalf.
      </Paragraph>

      <SectionHeading>2. User Responsibilities</SectionHeading>
      <Paragraph>
        You are responsible for maintaining the security of your account and for
        all activity that occurs under your credentials. You agree to:
      </Paragraph>
      <BulletList
        items={[
          "Provide accurate, current, and complete information when creating your account",
          "Maintain the confidentiality of your login credentials",
          "Notify us immediately if you suspect unauthorized access to your account",
          "Use Academiq only for its intended educational purposes",
          "Comply with all applicable laws and regulations in your use of the platform",
        ]}
      />

      <SectionHeading>3. Acceptable Use</SectionHeading>
      <Paragraph>
        You may not use Academiq in any manner that could harm, disable,
        overburden, or impair our systems or interfere with any other party's
        use of the platform. Prohibited activities include:
      </Paragraph>
      <BulletList
        items={[
          "Attempting to gain unauthorized access to our systems, accounts, or data",
          "Uploading or distributing malware, viruses, or other malicious code",
          "Harvesting, scraping, or collecting data from Academiq without authorization",
          "Using automated bots or scripts to access the platform in an abusive manner",
          "Impersonating another person or entity on the platform",
          "Engaging in any activity that violates applicable law or regulation",
        ]}
      />

      <SectionHeading>4. Academic Integrity</SectionHeading>
      <Paragraph>
        Academiq is designed to support your learning — not to replace it. You
        agree to use Academiq's AI features, practice tools, and study aids in
        accordance with the academic integrity policies of your school or
        educational institution.
      </Paragraph>
      <Paragraph>
        Submitting AI-generated content as your own original work without
        disclosure, or using Academiq to complete graded assessments in
        violation of your institution's policies, is a violation of these terms
        and may result in account suspension.
      </Paragraph>

      <SectionHeading>5. Intellectual Property</SectionHeading>
      <Paragraph>
        All content, features, and functionality of Academiq — including but not
        limited to text, graphics, logos, AI models, and software — are owned by
        Academiq or its licensors and are protected by intellectual property
        laws.
      </Paragraph>
      <Paragraph>
        You retain ownership of any original content you submit to Academiq. By
        submitting content, you grant Academiq a limited, non-exclusive,
        royalty-free license to use, store, and process that content solely for
        the purpose of providing the platform to you.
      </Paragraph>

      <SectionHeading>6. Availability of Service</SectionHeading>
      <Paragraph>
        We strive to maintain high availability of Academiq but do not guarantee
        uninterrupted or error-free access. We may perform scheduled or
        emergency maintenance that temporarily limits access. We will endeavor
        to provide advance notice of planned downtime where possible.
      </Paragraph>

      <SectionHeading>7. Limitation of Liability</SectionHeading>
      <Paragraph>
        To the fullest extent permitted by applicable law, Academiq and its
        affiliates, officers, employees, and licensors shall not be liable for
        any indirect, incidental, special, consequential, or punitive damages
        arising from your use of — or inability to use — the platform.
      </Paragraph>
      <Paragraph>
        Our total liability for any claim arising out of or relating to these
        terms or your use of Academiq shall not exceed the greater of (a) the
        amount you paid us in the twelve months prior to the claim, or (b) USD
        $100.
      </Paragraph>

      <SectionHeading>8. Changes to Terms</SectionHeading>
      <Paragraph>
        We may update these Terms of Service from time to time. When we make
        material changes, we will notify you via email or a prominent notice
        within the platform at least 14 days before the changes take effect.
        Continued use of Academiq after the effective date constitutes
        acceptance of the updated terms.
      </Paragraph>

      <SectionHeading>9. Contact</SectionHeading>
      <Paragraph>
        If you have questions about these Terms of Service or need to report a
        concern, please contact us at:
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
          Academiq Legal
          <br />
          <span style={{ color: "#6366f1" }}>legal@academiq.app</span>
          <br />
          We typically respond within 2–3 business days.
        </p>
      </div>
    </div>
  );
}