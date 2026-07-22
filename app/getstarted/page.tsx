"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  signInWithGoogle,
  signInWithPassword,
  signUpWithPassword,
} from "./action";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { useAuthContext } from "@/context";

/* ─── Icon set ─── */

function IconBot({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <path d="M8 16v0" strokeWidth="3" />
      <path d="M16 16v0" strokeWidth="3" />
    </svg>
  );
}
function IconSparkle({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}
function IconCalendar({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="4" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </svg>
  );
}
function IconBarChart({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="12" width="4" height="9" rx="1.5" />
      <rect x="10" y="7" width="4" height="14" rx="1.5" />
      <rect x="17" y="3" width="4" height="18" rx="1.5" />
    </svg>
  );
}
function IconClock({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
function IconMessage({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}
function IconFlame({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A5 5 0 0012 20a5 5 0 005-5c0-4-3-6-4-9-1 3-4.5 5-4.5 8.5z" />
    </svg>
  );
}
function IconShield({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconZap({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconDoc({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
function IconCheck({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconSend({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function IconClose({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconGoogle({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
function IconUser({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21v-2a6 6 0 0112 0v2" />
    </svg>
  );
}
function IconCheckCircle({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 12 15 16 9" />
    </svg>
  );
}

/* ─── Smooth scroll ─── */
const NAV_OFFSET = 80;
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ─── Shared style constants ─── */
const FG = "#F0F4FF";
const MUTED = "rgba(240,244,255,0.48)";
const MUTED2 = "rgba(240,244,255,0.32)";

/* ─── Academiq wordmark ─── */
function AcademiqLogo({ small = false }: { small?: boolean }) {
  const size = small ? 28 : 32;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: small ? 8 : 10,
          background:
            "linear-gradient(135deg, #4338CA 0%, #6366F1 60%, #22D3EE 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 4px 14px rgba(67,56,202,0.45), 0 0 24px rgba(99,102,241,0.18)",
          flexShrink: 0,
        }}
      >
        <svg
          width={size * 0.55}
          height={size * 0.55}
          viewBox="0 0 18 18"
          fill="none"
        >
          <path d="M9 2L2 14h14L9 2z" fill="white" opacity="0.9" />
          <path
            d="M5.5 10.5h7"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span
        className="font-display"
        style={{
          fontSize: small ? 15 : 17,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: FG,
        }}
      >
        Academiq
      </span>
    </div>
  );
}

/* ─── Progress bar ─── */
function ProgressBar({
  pct,
  color = "#6366F1",
}: {
  pct: number;
  color?: string;
}) {
  return (
    <div
      style={{
        height: 6,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 99,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: color,
          borderRadius: 99,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
}

/* ─── Floating preview cards ─── */
const cardShadow =
  "0 8px 36px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 30px rgba(99,102,241,0.06)";

function CardUpcomingAssignment() {
  return (
    <div
      className="glass float-a hover-lift"
      style={{
        borderRadius: 20,
        padding: "16px 18px",
        boxShadow: cardShadow,
        minWidth: 220,
        willChange: "transform",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "rgba(99,102,241,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#818CF8",
          }}
        >
          <IconCalendar size={14} />
        </div>
        <span
          className="font-display"
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: MUTED,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Upcoming
        </span>
      </div>
      <div
        className="font-display"
        style={{ fontSize: 14, fontWeight: 700, color: FG, marginBottom: 4 }}
      >
        Physics Lab Report
      </div>
      <div style={{ fontSize: 12, color: MUTED, marginBottom: 10 }}>
        Due 18 April · PHY3021
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 99,
            background: "#F59E0B",
          }}
        />
        <span
          className="font-mono-data"
          style={{ fontSize: 11, color: "#FCD34D" }}
        >
          3 days left
        </span>
      </div>
    </div>
  );
}

function CardModuleProgress() {
  return (
    <div
      className="glass float-b hover-lift"
      style={{
        borderRadius: 20,
        padding: "16px 18px",
        boxShadow: cardShadow,
        minWidth: 200,
        willChange: "transform",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "rgba(34,211,238,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#22D3EE",
          }}
        >
          <IconBarChart size={14} />
        </div>
        <span
          className="font-display"
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: MUTED,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Progress
        </span>
      </div>
      {[
        { label: "PHY3021", pct: 74, color: "#6366F1" },
        { label: "MAT2014", pct: 91, color: "#22D3EE" },
        { label: "CSC3003", pct: 58, color: "#10B981" },
      ].map((m) => (
        <div key={m.label} style={{ marginBottom: 8 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: MUTED,
                fontFamily: "var(--font-body)",
              }}
            >
              {m.label}
            </span>
            <span
              className="font-mono-data"
              style={{ fontSize: 11, color: FG, fontWeight: 500 }}
            >
              {m.pct}%
            </span>
          </div>
          <ProgressBar pct={m.pct} color={m.color} />
        </div>
      ))}
    </div>
  );
}

function CardExamCountdown() {
  return (
    <div
      className="glass float-c hover-lift"
      style={{
        borderRadius: 20,
        padding: "16px 18px",
        boxShadow: cardShadow,
        minWidth: 186,
        willChange: "transform",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "rgba(239,68,68,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#F87171",
          }}
        >
          <IconClock size={14} />
        </div>
        <span
          className="font-display"
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: MUTED,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Exam Countdown
        </span>
      </div>
      <div style={{ textAlign: "center", paddingBlock: 4 }}>
        <div
          className="font-mono-data"
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#F87171",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          14
        </div>
        <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>
          days until finals
        </div>
      </div>
      <div
        className="font-display"
        style={{
          fontSize: 12,
          color: FG,
          fontWeight: 600,
          textAlign: "center",
          marginTop: 8,
        }}
      >
        Advanced Physics II
      </div>
    </div>
  );
}

function CardStudyStreak() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const done = [true, true, true, true, false, false, false];
  return (
    <div
      className="glass float-a hover-lift"
      style={{
        borderRadius: 20,
        padding: "16px 18px",
        boxShadow: cardShadow,
        minWidth: 192,
        willChange: "transform",
        animationDelay: "2s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "rgba(251,146,60,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FB923C",
          }}
        >
          <IconFlame size={14} />
        </div>
        <span
          className="font-display"
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: MUTED,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Study Streak
        </span>
      </div>
      <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
        {days.map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 28,
                borderRadius: 6,
                background: done[i]
                  ? "linear-gradient(135deg,#4338CA,#6366F1)"
                  : "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: done[i] ? "white" : "transparent",
              }}
            >
              {done[i] && <IconCheck size={11} />}
            </div>
            <span
              style={{
                fontSize: 9,
                color: MUTED2,
                fontFamily: "var(--font-mono)",
              }}
            >
              {d}
            </span>
          </div>
        ))}
      </div>
      <div
        className="font-mono-data"
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: FG,
          letterSpacing: "-0.03em",
        }}
      >
        4{" "}
        <span
          style={{
            fontSize: 12,
            color: MUTED,
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            letterSpacing: 0,
          }}
        >
          day streak
        </span>
      </div>
    </div>
  );
}

/* ─── Dashboard preview ─── */
function DashboardPreview() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 560,
        margin: "0 auto",
      }}
    >
      <div
        className="glass grain"
        style={{
          borderRadius: 28,
          padding: "24px 28px",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.3), 0 0 60px rgba(99,102,241,0.08)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Titlebar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <AcademiqLogo small />
          <div style={{ display: "flex", gap: 6 }}>
            {["#EF4444", "#F59E0B", "#22C55E"].map((c) => (
              <div
                key={c}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 99,
                  background: c,
                  opacity: 0.7,
                }}
              />
            ))}
          </div>
        </div>

        <div
          className="font-display"
          style={{ fontSize: 16, fontWeight: 700, color: FG, marginBottom: 4 }}
        >
          Good morning, Jamie 👋
        </div>
        <div style={{ fontSize: 13, color: MUTED, marginBottom: 20 }}>
          You have 3 deadlines this week
        </div>

        {/* Deadline list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 18,
          }}
        >
          {[
            {
              tag: "Physics",
              title: "Lab Report",
              date: "18 Apr",
              color: "#818CF8",
              bg: "rgba(99,102,241,0.12)",
            },
            {
              tag: "Maths",
              title: "Assignment 4",
              date: "22 Apr",
              color: "#22D3EE",
              bg: "rgba(34,211,238,0.1)",
            },
            {
              tag: "CSC",
              title: "Mini Project",
              date: "28 Apr",
              color: "#34D399",
              bg: "rgba(16,185,129,0.1)",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 32,
                  borderRadius: 99,
                  background: item.color,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: item.color,
                      background: item.bg,
                      padding: "2px 7px",
                      borderRadius: 99,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {item.tag}
                  </span>
                  <span
                    className="font-display"
                    style={{ fontSize: 13, fontWeight: 600, color: FG }}
                  >
                    {item.title}
                  </span>
                </div>
              </div>
              <span
                className="font-mono-data"
                style={{ fontSize: 11, color: MUTED }}
              >
                {item.date}
              </span>
            </div>
          ))}
        </div>

        {/* Iris input bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            background:
              "linear-gradient(135deg, rgba(67,56,202,0.08) 0%, rgba(34,211,238,0.06) 100%)",
            borderRadius: 14,
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <div style={{ color: "#818CF8" }}>
            <IconBot size={14} />
          </div>
          <span style={{ fontSize: 13, color: MUTED, fontStyle: "italic" }}>
            Ask Iris anything about your modules…
          </span>
        </div>
      </div>

      {/* Floating cards */}
      <div style={{ position: "absolute", top: -32, left: -180, zIndex: 3 }}>
        <CardModuleProgress />
      </div>
      <div style={{ position: "absolute", top: 40, right: -210, zIndex: 3 }}>
        <CardExamCountdown />
      </div>
      <div style={{ position: "absolute", bottom: -28, left: -160, zIndex: 3 }}>
        <CardStudyStreak />
      </div>
      <div
        style={{ position: "absolute", bottom: -20, right: -200, zIndex: 3 }}
      >
        <CardUpcomingAssignment />
      </div>
    </div>
  );
}

/* ─── Features ─── */
const features = [
  {
    icon: <IconDoc size={20} />,
    color: "#818CF8",
    bg: "rgba(99,102,241,0.12)",
    title: "AI reads your modules",
    desc: "Upload your module guides and the AI extracts every assessment, deadline, and weighting automatically.",
  },
  {
    icon: <IconCheck size={20} />,
    color: "#34D399",
    bg: "rgba(16,185,129,0.1)",
    title: "Automatic tracking",
    desc: "Every assignment and test lands in your timeline the moment it's detected — no manual entry.",
  },
  {
    icon: <IconCalendar size={20} />,
    color: "#22D3EE",
    bg: "rgba(34,211,238,0.1)",
    title: "Full semester timeline",
    desc: "See every deadline in a clean, scrollable timeline so nothing slips through the gaps.",
  },
  {
    icon: <IconMessage size={20} />,
    color: "#A78BFA",
    bg: "rgba(139,92,246,0.12)",
    title: "Ask Iris your docs",
    desc: "Chat with Iris about your specific documents — not generic knowledge, your actual content.",
  },
];

function FeatureCard({ icon, color, bg, title, desc }: (typeof features)[0]) {
  return (
    <div
      className="glass hover-lift grain"
      style={{
        borderRadius: 24,
        padding: "24px 22px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          marginBottom: 14,
          boxShadow: `0 4px 14px ${bg}`,
        }}
      >
        {icon}
      </div>
      <div
        className="font-display"
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: FG,
          marginBottom: 6,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.6 }}>
        {desc}
      </div>
    </div>
  );
}

/* ─── Iris Chat Card ─── */
function IrisChatCard() {
  const [input, setInput] = useState("");
  const [replied, setReplied] = useState(false);
  const handleSend = () => {
    if (input.trim()) setReplied(true);
  };
  return (
    <div
      className="glass grain hover-lift"
      style={{
        borderRadius: 28,
        padding: "28px 28px 22px",
        boxShadow:
          "0 16px 60px rgba(67,56,202,0.18), 0 4px 16px rgba(0,0,0,0.4)",
        maxWidth: 520,
        width: "100%",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Iris header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 22,
          paddingBottom: 16,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: "linear-gradient(135deg,#4338CA,#6366F1,#22D3EE)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            boxShadow: "0 4px 14px rgba(67,56,202,0.4)",
          }}
        >
          <IconBot size={17} />
        </div>
        <div>
          <div
            className="font-display"
            style={{ fontSize: 14, fontWeight: 700, color: FG }}
          >
            Iris
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 99,
                background: "#22C55E",
                boxShadow: "0 0 6px #22C55E",
              }}
            />
            <span style={{ fontSize: 11, color: MUTED }}>
              Connected to your modules
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginBottom: 18,
        }}
      >
        {/* User bubble */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              background: "linear-gradient(135deg,#4338CA,#6366F1)",
              color: "white",
              borderRadius: "16px 16px 4px 16px",
              padding: "10px 14px",
              maxWidth: "80%",
              fontSize: 13.5,
              lineHeight: 1.5,
              boxShadow: "0 4px 14px rgba(67,56,202,0.35)",
            }}
          >
            When is my next physics test?
          </div>
        </div>

        {/* Iris reply */}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              flexShrink: 0,
              background: "linear-gradient(135deg,#4338CA,#6366F1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <IconBot size={13} />
          </div>
          <div
            style={{
              background: "rgba(20,27,45,0.9)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "4px 16px 16px 16px",
              padding: "10px 14px",
              maxWidth: "85%",
              fontSize: 13.5,
              color: FG,
              lineHeight: 1.6,
            }}
          >
            Your next Physics semester test is on{" "}
            <span
              className="font-mono-data"
              style={{ fontSize: 13, color: "#818CF8", fontWeight: 600 }}
            >
              14 April
            </span>
            . It contributes{" "}
            <span style={{ color: "#818CF8", fontWeight: 600 }}>20%</span>{" "}
            toward your participation mark.
          </div>
        </div>

        {replied && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                flexShrink: 0,
                background: "linear-gradient(135deg,#4338CA,#6366F1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <IconBot size={13} />
            </div>
            <div
              style={{
                background: "rgba(20,27,45,0.9)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "4px 16px 16px 16px",
                padding: "10px 14px",
                maxWidth: "85%",
                fontSize: 13.5,
                color: FG,
                lineHeight: 1.6,
              }}
            >
              I pulled that from your PHY3021 module guide. Want me to suggest a
              study plan for the next 10 days?
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          background: "rgba(8,13,26,0.6)",
          borderRadius: 14,
          border: "1px solid rgba(99,102,241,0.2)",
          padding: "8px 8px 8px 14px",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask Iris about your modules…"
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: 13.5,
            color: FG,
            fontFamily: "var(--font-body)",
            userSelect: "text",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            border: "none",
            background: "linear-gradient(135deg,#4338CA,#6366F1)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(67,56,202,0.35)",
            transition: "transform 0.15s ease",
          }}
        >
          <IconSend size={14} />
        </button>
      </div>
    </div>
  );
}

/* ─── Trust chips ─── */
const trustItems = [
  { icon: <IconShield size={14} />, text: "Private by design" },
  { icon: <IconDoc size={14} />, text: "Your documents stay yours" },
  { icon: <IconZap size={14} />, text: "Fast AI-powered parsing" },
  { icon: <IconCheck size={14} />, text: "Built for university students" },
];

/* ─── Shared field style helpers ─── */
const fieldInput: React.CSSProperties = {
  padding: "15px 14px",
  borderRadius: 12,
  border: "1px solid rgba(99,102,241,0.18)",
  background: "rgba(8,13,26,0.8)",
  fontSize: 14,
  color: FG,
  outline: "none",
  fontFamily: "var(--font-body)",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  userSelect: "text",
  width: "100%",
};
const fieldLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "rgba(240,244,255,0.72)",
  letterSpacing: "0.01em",
  fontFamily: "var(--font-display)",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="font-display" style={fieldLabel}>
        {label}
      </span>
      {children}
    </label>
  );
}

function StyledInput({
  type = "text",
  placeholder,
  autoComplete,
  setState,
}: {
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  setState: (value: string) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={(e) => setState(e.currentTarget.value)}
      style={fieldInput}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.18)";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );
}

/* ─── Auth Modal ─── */
type ModalMode = "signin" | "signup";

function AuthModal({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user: User | null;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<ModalMode>("signin");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPasswordV1, setNewPasswordV1] = useState("");
  const [newPasswordV2, setNewPasswordV2] = useState("");
  const [includeSignIn, setIncludeSignIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   For Stats
  const [university, setUniversity] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [faculty, setFaculty] = useState("");

  const { initialize } = useAuthContext();

  const passwordMatch = newPasswordV1 === newPasswordV2;
  const noInput =
    !name.trim() ||
    !email.trim() ||
    !university.trim() ||
    !faculty.trim() ||
    !yearOfStudy.trim();

  const blockRegister =
    noInput ||
    (!user
      ? !passwordMatch || !newPasswordV1.trim() || !newPasswordV2.trim()
      : false);

  // show the SignUp state if the user is not registered
  useEffect(() => {
    if (user) {
      setMode("signup");
      setIncludeSignIn(false);
    }
  }, [user]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus first element on open
  useEffect(() => {
    if (open) setTimeout(() => firstFocusRef.current?.focus(), 50);
  }, [open]);

  // Focus trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      "button, input, select, a[href], [tabindex]:not([tabindex='-1'])",
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleCreateAccount = async () => {
    if (blockRegister) return;
    setIsSubmitting(true);

    try {
      await signUpWithPassword({
        id: user?.id,
        name,
        email,
        university,
        faculty,
        yearOfStudy,
        password: newPasswordV2,
      });
      await initialize();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInWithPassword = async () => {
    if (!email.trim() || !currentPassword.trim()) return;
    setIsSubmitting(true);

    try {
      await signInWithPassword(email, currentPassword);
      await initialize();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    setIsSubmitting(true);

    try {
      await signInWithGoogle();
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchToSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    setMode("signup");
  };

  const switchToSignin = (e: React.MouseEvent) => {
    e.preventDefault();
    setMode("signin");
  };

  const linkStyle: React.CSSProperties = {
    color: "#818CF8",
    fontWeight: 600,
    textDecoration: "none",
    fontFamily: "var(--font-display)",
    cursor: "pointer",
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={mode === "signin" ? "Sign in" : "Create account"}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "rgba(4,6,14,0.7)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.22s ease",
      }}
    >
      <div
        ref={modalRef}
        onKeyDown={handleKeyDown}
        className="glass grain"
        style={{
          borderRadius: 30,
          padding: "36px 36px 32px",
          boxShadow:
            "0 32px 100px rgba(0,0,0,0.7), 0 8px 32px rgba(99,102,241,0.18), 0 0 0 1px rgba(255,255,255,0.04)",
          width: "100%",
          maxWidth: 400,
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          opacity: open ? 1 : 0,
          transform: open
            ? "translateY(0) scale(1)"
            : "translateY(16px) scale(0.97)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          userSelect: "none",
        }}
      >
        {/* Close */}
        <button
          ref={firstFocusRef}
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            width: 30,
            height: 30,
            borderRadius: 8,
            border: "none",
            background: "rgba(255,255,255,0.06)",
            color: MUTED,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s ease, color 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = FG;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = MUTED;
          }}
        >
          <IconClose size={14} />
        </button>

        {/* ── Sign In state ── */}
        {mode === "signin" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div
                className="font-display"
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: FG,
                  letterSpacing: "-0.03em",
                  marginBottom: 6,
                }}
              >
                Welcome back
              </div>
              <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.5 }}>
                Sign in to continue to Academiq.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <Field label="Email">
                <StyledInput
                  type="email"
                  placeholder="you@university.ac"
                  autoComplete="email"
                  setState={(value) => setEmail(value)}
                />
              </Field>
              <Field label="Password">
                <StyledInput
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  setState={(value) => setCurrentPassword(value)}
                />
              </Field>
            </div>

            <button
              className="btn-primary"
              onClick={handleSignInWithPassword}
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: 14,
                marginBottom: 10,
                background:
                  !email.trim() || !currentPassword.trim() || isSubmitting
                    ? "gray"
                    : "linear-gradient(135deg, #4338ca 0%, #6366f1 55%, #818cf8 100%)",
                color:
                  !email.trim() || !currentPassword.trim() || isSubmitting
                    ? "black"
                    : "white",
                cursor:
                  !email.trim() || !currentPassword.trim() || isSubmitting
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {!isSubmitting ? "Sign In" : "Signing in..."}
            </button>

            <button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "11px 24px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(20,27,45,0.85)",
                color: "rgba(240,244,255,0.8)",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                marginBottom: 20,
                transition: "background 0.15s ease",
              }}
              onClick={handleSignInWithGoogle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(30,37,64,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(20,27,45,0.85)";
              }}
            >
              <IconGoogle size={16} />
              {!isSubmitting ? "Continue with Google" : "Continuing..."}
            </button>

            <div style={{ textAlign: "center", fontSize: 13, color: MUTED }}>
              {"Don't have an account? "}
              <a
                href="#"
                style={linkStyle}
                onClick={switchToSignup}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Create one
              </a>
            </div>
          </div>
        )}

        {/* ── Create Account state ── */}
        {mode === "signup" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div
                className="font-display"
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: FG,
                  letterSpacing: "-0.03em",
                  marginBottom: 6,
                }}
              >
                Create your account
              </div>
              <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.5 }}>
                {"Let's get your semester organised."}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 11,
                marginBottom: 20,
              }}
            >
              <Field label="Full Name">
                <StyledInput
                  type="text"
                  placeholder="Ishmail Caleb"
                  autoComplete="name"
                  setState={(value) => setName(value)}
                />
              </Field>
              <Field label="Email Address">
                <StyledInput
                  type="email"
                  placeholder="you@university.ac"
                  autoComplete="email"
                  setState={(value) => setEmail(value)}
                />
              </Field>
              {includeSignIn && (
                <>
                  <Field label="Password">
                    <StyledInput
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      setState={(value) => setNewPasswordV1(value)}
                    />
                  </Field>
                  <Field label="Confirm Password">
                    <StyledInput
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      setState={(value) => setNewPasswordV2(value)}
                    />
                  </Field>
                </>
              )}
              <Field label="University">
                <StyledInput
                  type="text"
                  placeholder="e.g. University of Cape Town"
                  autoComplete="organization"
                  setState={(value) => setUniversity(value)}
                />
              </Field>
              <Field label="Faculty">
                <StyledInput
                  type="text"
                  placeholder="e.g. Science, Engineering, Commerce"
                  setState={(value) => setFaculty(value)}
                />
              </Field>
              <Field label="Year of Study">
                <StyledInput
                  type="text"
                  placeholder="e.g. 2nd year"
                  setState={(value) => setYearOfStudy(value)}
                />
              </Field>
            </div>

            <button
              className="btn-primary"
              onClick={handleCreateAccount}
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: 14,
                background:
                  blockRegister || isSubmitting
                    ? "gray"
                    : "linear-gradient(135deg, #4338ca 0%, #6366f1 55%, #818cf8 100%)",
                color: blockRegister || isSubmitting ? "black" : "white",
                cursor:
                  blockRegister || isSubmitting ? "not-allowed" : "pointer",
                marginBottom: 10,
              }}
            >
              {!isSubmitting ? "Create Account" : "Creating..."}
            </button>

            <div style={{ textAlign: "center", fontSize: 13, color: MUTED }}>
              {"Already have an account? "}
              <a
                href="#"
                style={linkStyle}
                onClick={switchToSignin}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Sign In
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const { user: authUser, isLoading: isAuthLoading } = useAuthContext();

  useEffect(() => {
    if (isAuthLoading) return;

    async function getProfile() {
      if (!authUser) return;

      const { data: profile, error } = await supabase
        .from("users")
        .select("id")
        .eq("id", authUser.id)
        .maybeSingle();

      if (error) throw error;

      if (profile) {
        router.replace("/");
        return;
      }

      setModalOpen(true);
    }

    getProfile();
  }, [authUser, isAuthLoading, router]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const navLinkStyle: React.CSSProperties = {
    fontSize: 13.5,
    fontWeight: 500,
    color: MUTED,
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: 10,
    fontFamily: "var(--font-display)",
    cursor: "pointer",
    transition: "color 0.15s ease, background-color 0.15s ease",
    background: "transparent",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(ellipse at 20% 10%, rgba(99,102,241,0.14) 0%, transparent 52%),
          radial-gradient(ellipse at 80% 80%, rgba(34,211,238,0.08) 0%, transparent 52%),
          radial-gradient(ellipse at 60% 30%, rgba(139,92,246,0.06) 0%, transparent 45%),
          #080D1A
        `,
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Grain layer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          mixBlendMode: "overlay",
        }}
      />

      {/* ── NAV ── */}
      <header
        style={{
          position: "sticky",
          top: 16,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          padding: "0 24px",
        }}
      >
        <nav
          className="glass"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            borderRadius: 18,
            padding: "10px 14px",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 0 30px rgba(99,102,241,0.1)"
              : "0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)",
            transition: "box-shadow 0.3s ease",
            maxWidth: 760,
            width: "100%",
          }}
        >
          <AcademiqLogo small />
          <div style={{ flex: 1 }} />
          <button
            style={navLinkStyle}
            onClick={() => scrollToId("features")}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = FG;
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = MUTED;
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Features
          </button>
          <button
            style={navLinkStyle}
            onClick={() => scrollToId("ai")}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = FG;
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = MUTED;
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Iris
          </button>
          <button
            onClick={openModal}
            style={{
              ...navLinkStyle,
              marginLeft: 4,
              fontWeight: 600,
              color: FG,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Sign In
          </button>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: 64,
          paddingBottom: 120,
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          {/* Badge */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.22)",
                borderRadius: 99,
                padding: "6px 16px",
                gap: 6,
              }}
            >
              <div style={{ color: "#818CF8", display: "flex" }}>
                <IconBot size={13} />
              </div>
              <span
                className="font-display"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#818CF8",
                  letterSpacing: "0.01em",
                }}
              >
                AI-powered academic companion · Meet Iris
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 900,
              color: FG,
              textAlign: "center",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              margin: "0 0 20px",
            }}
          >
            Your AI Academic
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #6366F1 0%, #818CF8 50%, #22D3EE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Companion
            </span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: MUTED,
              textAlign: "center",
              maxWidth: 540,
              margin: "0 auto 36px",
              lineHeight: 1.65,
            }}
          >
            Academiq automatically organises your modules, assessments, study
            guides and deadlines — then answers questions about your own
            academic documents.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginBottom: 80,
            }}
          >
            <button className="btn-primary" onClick={openModal}>
              Get Started
            </button>
            <button className="btn-secondary">See Demo</button>
          </div>

          {/* Dashboard preview */}
          <div style={{ position: "relative" }}>
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        id="features"
        style={{ position: "relative", zIndex: 1, padding: "80px 40px" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#818CF8",
                fontFamily: "var(--font-display)",
                marginBottom: 10,
              }}
            >
              Features
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 800,
                color: FG,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Everything you need. Nothing you don't.
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── IRIS SHOWCASE ── */}
      <section
        id="ai"
        style={{ position: "relative", zIndex: 1, padding: "60px 40px 80px" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#22D3EE",
                fontFamily: "var(--font-display)",
                marginBottom: 10,
              }}
            >
              <IconBot size={13} />
              Iris
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 800,
                color: FG,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Ask anything. Get precise answers.
            </h2>
            <p style={{ fontSize: 15, color: MUTED, marginTop: 12 }}>
              Iris knows your exact modules — not generic textbook answers.
            </p>
          </div>
          <IrisChatCard />
        </div>
      </section>

      {/* ── TRUST ── */}
      <section
        style={{ position: "relative", zIndex: 1, padding: "24px 40px 80px" }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {trustItems.map((item, i) => (
            <div
              key={i}
              className="glass hover-lift"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 99,
                padding: "9px 18px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                color: "#818CF8",
              }}
            >
              {item.icon}
              <span
                className="font-display"
                style={{ fontSize: 13, fontWeight: 600, color: FG }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{ position: "relative", zIndex: 1, padding: "0 40px 40px" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            className="glass grain"
            style={{
              borderRadius: 24,
              padding: "28px 32px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <AcademiqLogo small />
                <p
                  style={{
                    fontSize: 12.5,
                    color: MUTED,
                    margin: "8px 0 0",
                    maxWidth: 260,
                    lineHeight: 1.5,
                  }}
                >
                  Helping students stay organised, focused, and ahead.
                </p>
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {["Privacy", "Terms", "Support", "Changelog"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: 13,
                      color: MUTED,
                      textDecoration: "none",
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = FG)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                marginTop: 20,
                paddingTop: 16,
              }}
            >
              <span
                className="font-mono-data"
                style={{ fontSize: 11, color: MUTED2 }}
              >
                © 2025 Academiq. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── AUTH MODAL ── */}
      <AuthModal open={modalOpen} onClose={closeModal} user={authUser} />
    </div>
  );
}
