"use client";

import { useRouter } from "next/navigation";

export function NavLinks() {
  const router = useRouter();
  return (
    <nav style={{ display: "flex", gap: "1.75rem", flexWrap: "wrap" }}>
      {[
        { label: "Privacy Policy", tab: "privacy" },
        { label: "Terms of Service", tab: "terms" },
      ].map(({ label, tab }) => (
        <button
          key={tab}
          onClick={() => {
            router.push(`/legal/${tab}`);
          }}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontSize: "0.8125rem",
            color: "#3d4f7a",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "#6366f1")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "#3d4f7a")
          }
        >
          {label}
        </button>
      ))}
      <a
        href="mailto:hello@academiq.app"
        style={{
          fontSize: "0.8125rem",
          color: "#3d4f7a",
          textDecoration: "none",
          transition: "color 0.15s ease",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = "#6366f1")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = "#3d4f7a")
        }
      >
        Contact
      </a>
    </nav>
  );
}
