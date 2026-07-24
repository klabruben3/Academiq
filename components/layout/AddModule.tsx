"use client";

import { useState, useRef, useCallback } from "react";
import type { Module, AssessmentComponent, AssessmentType } from "@/types";
import { useMediaQuery } from "@/context";

// ─── Validation ────────────────────────────────────────────────────────────

type EditorSection = "info" | "dates" | "requirements" | "assessments";

interface ValidationError {
  field: string;
  label: string;
  section: EditorSection;
  message: string;
}

function validateModule(mod: Module): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!mod.name.trim())
    errors.push({
      field: "name",
      label: "Module Name",
      section: "info",
      message: "Module name is required.",
    });
  if (!mod.code.trim())
    errors.push({
      field: "code",
      label: "Module Code",
      section: "info",
      message: "Module code is required.",
    });
  if (!mod.description?.trim())
    errors.push({
      field: "description",
      label: "Description",
      section: "info",
      message: "Description is required.",
    });
  if (!mod.color.trim())
    errors.push({
      field: "color",
      label: "Module Color",
      section: "info",
      message: "A module color is required.",
    });
  if (!mod.semesterStart)
    errors.push({
      field: "semesterStart",
      label: "Semester Start",
      section: "dates",
      message: "Semester start date is required.",
    });
  if (!mod.semesterEnd)
    errors.push({
      field: "semesterEnd",
      label: "Semester End",
      section: "dates",
      message: "Semester end date is required.",
    });
  if (
    mod.semesterStart &&
    mod.semesterEnd &&
    mod.semesterStart >= mod.semesterEnd
  )
    errors.push({
      field: "semesterEnd",
      label: "Semester End",
      section: "dates",
      message: "Semester end must be after semester start.",
    });
  if (mod.hasExam && !mod.examDate)
    errors.push({
      field: "examDate",
      label: "Exam Date",
      section: "dates",
      message: "Exam date is required when module has an exam.",
    });
  if (!mod.addedYear || mod.addedYear < 2000 || mod.addedYear > 2100)
    errors.push({
      field: "addedYear",
      label: "Added Year",
      section: "info",
      message: "A valid year is required (e.g. 2026).",
    });

  return errors;
}

// ─── Mock NWU Module Data ──────────────────────────────────────────────────

const NWU_MODULES: Module[] = [
  {
    id: "mths121",
    code: "MTHS121",
    name: "Mathematics 121",
    description:
      "Covers differential and integral calculus, sequences and series, and their applications for first-year engineering and science students.",
    color: "#6366f1",
    lecturer: "Mr Calla Hattingh / Dr Mark Sias",
    email: "Calla.Hattingh@nwu.ac.za",
    office: "PC-G3-119",
    consultationHours: "See eFundi timetable / office doors",
    semesterStart: "2026-07-13",
    semesterEnd: "2026-11-30",
    hasExam: true,
    examDate: "2026-11-01",
    examDateEnd: "2026-11-30",
    addedYear: 2026,
    passRequirements: { participationMin: 40, finalMin: 50 },
    participationFormula: {
      minimumToPass: 40,
      components: [
        { componentId: "mths121-weekly-tests", weight: 50 },
        { componentId: "mths121-aleks", weight: 5 },
        { componentId: "mths121-attendance", weight: 5 },
        { componentId: "mths121-semester-test", weight: 40 },
      ],
    },
    assessments: [
      {
        id: "mths121-test-1",
        name: "Weekly Test 1",
        type: "weekly-test",
        weight: 0,
        maxScore: 10,
        date: "2026-07-14",
        duration: "15 minutes",
        studyUnits: "MTHS111 SU 4–5",
        category: "weekly-tests",
        required: true,
      },
      {
        id: "mths121-test-2",
        name: "Weekly Test 2",
        type: "weekly-test",
        weight: 0,
        maxScore: 10,
        date: "2026-07-21",
        duration: "15 minutes",
        studyUnits: "SU 1.1–1.2",
        category: "weekly-tests",
        required: true,
      },
      {
        id: "mths121-test-3",
        name: "Weekly Test 3",
        type: "weekly-test",
        weight: 0,
        maxScore: 10,
        date: "2026-07-28",
        duration: "15 minutes",
        studyUnits: "SU 1.1–2.3",
        category: "weekly-tests",
        required: true,
      },
      {
        id: "mths121-semester-test",
        name: "Semester Test",
        type: "semester-test",
        weight: 40,
        maxScore: 75,
        date: "2026-09-01",
        dateEnd: "2026-09-11",
        studyUnits: "SU 1–5",
        duration: "1.5 hours",
        required: true,
        minimumExamAdmission: 40,
        category: "semester-test",
      },
    ],
  },
  {
    id: "appm122",
    code: "APPM122",
    name: "Mathematical Modelling & Vector Algebra",
    description:
      "Introduces mathematical modelling techniques and vector algebra with practical applications across applied and engineering sciences.",
    color: "#10b981",
    lecturer: "Dr Hitge",
    email: "Mariette.Hitge@nwu.ac.za",
    office: "PC-G3-134",
    consultationHours: "Mo/Tu 11:00–14:00, We 8:30–10:30, Th 11:00–14:00",
    semesterStart: "2026-07-13",
    semesterEnd: "2026-10-28",
    hasExam: true,
    examDate: "2026-10-28",
    addedYear: 2026,
    passRequirements: { participationMin: 40 },
    participationFormula: {
      minimumToPass: 40,
      components: [
        { componentId: "appm122-class-test-1", weight: 30 },
        { componentId: "appm122-class-test-2", weight: 30 },
        { componentId: "appm122-semester-test", weight: 40 },
      ],
    },
    assessments: [
      {
        id: "appm122-class-test-1",
        name: "Class Test 1",
        type: "class-test",
        weight: 30,
        maxScore: 40,
        date: "2026-08-03",
        time: "14:30",
        location: "PC-E8-G34",
        duration: "1 hour",
        studyUnits: "SU 1–2",
        required: true,
        category: "class-test",
      },
      {
        id: "appm122-semester-test",
        name: "Semester Test",
        type: "semester-test",
        weight: 40,
        maxScore: 50,
        date: "2026-09-01",
        dateEnd: "2026-09-11",
        studyUnits: "SU 1–4",
        duration: "1.5 hours",
        required: true,
        minimumExamAdmission: 40,
        category: "semester-test",
      },
      {
        id: "appm122-class-test-2",
        name: "Class Test 2",
        type: "class-test",
        weight: 30,
        maxScore: 40,
        date: "2026-10-12",
        time: "14:30",
        location: "PC-E8-G34",
        duration: "1 hour",
        studyUnits: "SU 4–5",
        required: true,
        category: "class-test",
      },
    ],
  },
  {
    id: "sttn125",
    code: "STTN125",
    name: "Introductory Probability Theory",
    description:
      "Foundations of probability theory covering combinatorics, random variables, probability distributions, and basic statistical inference.",
    color: "#f59e0b",
    lecturer: "Dr Carl van Heerden",
    email: "carl.vanheerden@nwu.ac.za",
    office: "G3-221",
    consultationHours: "Tuesdays 14:00–15:30",
    semesterStart: "2026-07-13",
    semesterEnd: "2026-12-04",
    hasExam: true,
    examDate: "2026-10-28",
    addedYear: 2026,
    passRequirements: { participationMin: 40, examMin: 40, finalMin: 50 },
    participationFormula: {
      minimumToPass: 40,
      components: [
        { componentId: "sttn125-class-tests", weight: 90, dropLowest: 1 },
        { componentId: "sttn125-attendance", weight: 10 },
      ],
    },
    assessments: [
      {
        id: "sttn125-class-test-1",
        name: "Class Test 1",
        type: "class-test",
        weight: 0,
        maxScore: 100,
        date: "2026-08-14",
        studyUnits: "SU 1.5, 1.6, 2.1",
        duration: "Friday period",
        category: "class-tests",
      },
      {
        id: "sttn125-class-test-2",
        name: "Class Test 2",
        type: "class-test",
        weight: 0,
        maxScore: 100,
        date: "2026-09-01",
        dateEnd: "2026-09-11",
        studyUnits: "SU 2.1, 2.2",
        duration: "Assessment week",
        category: "class-tests",
      },
      {
        id: "sttn125-attendance",
        name: "Class Attendance",
        type: "attendance",
        weight: 0,
        maxScore: 100,
        category: "attendance",
        required: true,
      },
    ],
  },
  {
    id: "alde122",
    code: "ALDE122",
    name: "Academic Literacy 122",
    description:
      "Develops academic reading, writing, critical thinking, and digital literacy skills essential for university-level study.",
    color: "#ec4899",
    lecturer: "Various (see eFundi)",
    consultationHours: "See eFundi",
    semesterStart: "2026-07-13",
    semesterEnd: "2026-10-31",
    hasExam: false,
    addedYear: 2026,
    passRequirements: { finalMin: 50, minimumCompletionPercent: 80 },
    participationFormula: {
      minimumToPass: 50,
      components: [
        { componentId: "alde122-assessment-1", weight: 10 },
        { componentId: "alde122-assessment-2", weight: 20 },
        { componentId: "alde122-assessment-3", weight: 20 },
        { componentId: "alde122-assessment-4", weight: 25 },
        { componentId: "alde122-assessment-5", weight: 25 },
      ],
    },
    assessments: [
      {
        id: "alde122-assessment-1",
        name: "Digital Literacy & AI Ethics",
        type: "online-test",
        weight: 10,
        maxScore: 100,
        dateAvailable: "2026-07-13",
        date: "2026-07-26",
        time: "23:55",
        studyUnits: "eFundi Lesson: Digital literacy & AI",
        duration: "Online MCQ",
        location: "eFundi",
        required: true,
        category: "continuous",
        countsTowardCompletion: true,
      },
      {
        id: "alde122-assessment-2",
        name: "Group Writing Task (AI)",
        type: "assignment",
        weight: 20,
        maxScore: 100,
        dateAvailable: "2026-08-24",
        date: "2026-08-30",
        time: "23:55",
        studyUnits: "eFundi Lessons 1–8",
        required: true,
        category: "continuous",
        countsTowardCompletion: true,
      },
      {
        id: "alde122-assessment-3",
        name: "Semester Test",
        type: "semester-test",
        weight: 20,
        maxScore: 100,
        date: "2026-10-05",
        dateEnd: "2026-10-09",
        studyUnits: "All eFundi lessons",
        duration: "In-class",
        required: true,
        category: "continuous",
        countsTowardCompletion: true,
      },
    ],
  },
];

const BLANK_MODULE: Module = {
  id: "new-module",
  code: "",
  name: "",
  description: "",
  lecturer: "",
  email: "",
  office: "",
  consultationHours: "",
  semesterStart: "",
  semesterEnd: "",
  hasExam: false,
  color: "#6366f1",
  assessments: [],
  participationFormula: { minimumToPass: 50, components: [] },
  passRequirements: { finalMin: 50 },
  addedYear: new Date().getFullYear(),
};

type AppView = "empty" | "nwu-search" | "editor";

// ─── Icons ─────────────────────────────────────────────────────────────────

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="14,2 14,8 20,8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="16"
      y1="13"
      x2="8"
      y2="13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="16"
      y1="17"
      x2="8"
      y2="17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const GraduationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <polygon
      points="12,2 22,8.5 12,15 2,8.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 11.5V17c0 0 2 2.5 6 2.5s6-2.5 6-2.5v-5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="22"
      y1="8.5"
      x2="22"
      y2="15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path
      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    style={{ width: 14, height: 14, display: "block", flexShrink: 0 }}
  >
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BackIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    style={{ width: 14, height: 14, display: "block", flexShrink: 0 }}
  >
    <path
      d="M13 8H3M7 4L3 8l4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    style={{ width: 15, height: 15, display: "block" }}
  >
    <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M13 13l4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
    <path
      d="M8 3v10M3 8h10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13 }}>
    <path
      d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13 }}>
    <path
      d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const AlertIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    style={{ width: 13, height: 13, flexShrink: 0 }}
  >
    <path
      d="M8 1.5L14.5 13H1.5L8 1.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="8"
      y1="6"
      x2="8"
      y2="9.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
  </svg>
);

// ─── Illustration ──────────────────────────────────────────────────────────

const BookStackIllustration = () => (
  <svg
    viewBox="0 0 320 180"
    fill="none"
    style={{ width: "100%", height: "100%" }}
  >
    <defs>
      <linearGradient id="bk1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#3730a3" />
      </linearGradient>
      <linearGradient id="bk2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
      <linearGradient id="bk3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <linearGradient id="doc" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e2844" />
        <stop offset="100%" stopColor="#141c35" />
      </linearGradient>
      <filter id="glow">
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="10"
          floodColor="#6366f1"
          floodOpacity="0.18"
        />
      </filter>
    </defs>
    <ellipse cx="160" cy="148" rx="90" ry="14" fill="#6366f1" opacity="0.07" />
    <g filter="url(#glow)">
      <rect
        x="195"
        y="48"
        width="68"
        height="88"
        rx="4"
        fill="url(#doc)"
        stroke="rgba(99,102,241,0.2)"
        strokeWidth="1"
      />
      <rect x="199" y="62" width="40" height="2" rx="1" fill="#4f5a7a" />
      <rect x="199" y="69" width="52" height="1.5" rx="1" fill="#3a4568" />
      <rect x="199" y="75" width="46" height="1.5" rx="1" fill="#3a4568" />
      <rect x="199" y="81" width="50" height="1.5" rx="1" fill="#3a4568" />
      <rect x="199" y="87" width="38" height="1.5" rx="1" fill="#3a4568" />
      <rect
        x="195"
        y="48"
        width="4"
        height="88"
        rx="2"
        fill="#6366f1"
        opacity="0.55"
      />
      <path
        d="M255 48 L263 56 L255 56 Z"
        fill="#0f1629"
        stroke="rgba(99,102,241,0.2)"
        strokeWidth="0.5"
      />
    </g>
    <g filter="url(#glow)">
      <rect x="78" y="118" width="108" height="22" rx="3" fill="url(#bk1)" />
      <rect x="78" y="118" width="10" height="22" rx="2" fill="#3730a3" />
      <circle cx="89" cy="126" r="1.5" fill="#818cf8" opacity="0.5" />
      <circle cx="89" cy="132" r="1.5" fill="#818cf8" opacity="0.5" />
      <rect x="83" y="94" width="102" height="26" rx="3" fill="url(#bk2)" />
      <rect x="83" y="94" width="11" height="26" rx="2" fill="#4338ca" />
      <circle cx="95" cy="103" r="1.5" fill="#a5b4fc" opacity="0.6" />
      <circle cx="95" cy="109" r="1.5" fill="#a5b4fc" opacity="0.6" />
      <circle cx="95" cy="115" r="1.5" fill="#a5b4fc" opacity="0.6" />
      <rect x="88" y="66" width="94" height="30" rx="3" fill="url(#bk3)" />
      <rect x="88" y="66" width="12" height="30" rx="2" fill="#4f46e5" />
      <circle cx="101" cy="76" r="1.5" fill="#c7d2fe" opacity="0.7" />
      <circle cx="101" cy="82" r="1.5" fill="#c7d2fe" opacity="0.7" />
      <circle cx="101" cy="88" r="1.5" fill="#c7d2fe" opacity="0.7" />
    </g>
    <g transform="translate(54,42) rotate(-28)" opacity="0.75">
      <rect x="0" y="0" width="6" height="40" rx="2" fill="#4f46e5" />
      <polygon points="0,40 6,40 3,50" fill="#fbbf24" opacity="0.85" />
      <rect x="0" y="0" width="6" height="5" rx="1" fill="#818cf8" />
    </g>
    <g transform="translate(238,30)" opacity="0.65">
      <polygon points="14,0 26,6 14,12 2,6" fill="#6366f1" />
      <rect x="11" y="6" width="6" height="8" fill="#4f46e5" />
      <ellipse cx="14" cy="14" rx="5" ry="2" fill="#4f46e5" />
      <line
        x1="26"
        y1="6"
        x2="26"
        y2="14"
        stroke="#818cf8"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle cx="26" cy="15" r="2" fill="#a5b4fc" />
    </g>
    <circle cx="57" cy="34" r="1.5" fill="#818cf8" opacity="0.4" />
    <circle cx="268" cy="46" r="1" fill="#a5b4fc" opacity="0.35" />
  </svg>
);

// ─── Iris AI Tooltip ───────────────────────────────────────────────────────

const IrisTooltip = () => (
  <div
    style={{
      position: "absolute",
      bottom: "calc(100% + 12px)",
      left: "50%",
      transform: "translateX(-50%)",
      width: "min(264px, 90vw)",
      backgroundColor: "#111829",
      border: "1px solid rgba(99,102,241,0.28)",
      borderRadius: "14px",
      padding: "14px 16px",
      boxShadow: "0 16px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.1)",
      zIndex: 100,
      pointerEvents: "none",
      textAlign: "left",
    }}
  >
    <div
      style={{
        position: "absolute",
        bottom: "-5px",
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        width: 10,
        height: 10,
        backgroundColor: "#111829",
        borderRight: "1px solid rgba(99,102,241,0.28)",
        borderBottom: "1px solid rgba(99,102,241,0.28)",
      }}
    />
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 26,
          height: 26,
          borderRadius: 8,
          backgroundColor: "rgba(99,102,241,0.15)",
          color: "#818cf8",
          flexShrink: 0,
        }}
      >
        <SparkleIcon />
      </div>
      <div>
        <div
          style={{
            color: "#e2e8f8",
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          Iris AI Extraction
        </div>
        <div style={{ color: "#6b7a99", fontSize: 10.5, lineHeight: 1.3 }}>
          Automated parsing · may make mistakes
        </div>
      </div>
    </div>
    <div
      style={{
        marginBottom: 4,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span style={{ color: "#6b7a99", fontSize: 11 }}>
        Extraction accuracy
      </span>
      <span
        style={{
          color: "#a5b4fc",
          fontSize: 11,
          fontWeight: 600,
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        87%
      </span>
    </div>
    <div
      style={{
        height: 4,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: 2,
        overflow: "hidden",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          height: "100%",
          width: "87%",
          borderRadius: 2,
          background: "linear-gradient(90deg,#6366f1,#818cf8)",
        }}
      />
    </div>
    <p style={{ color: "#6b7a99", fontSize: 11, lineHeight: 1.6, margin: 0 }}>
      Iris reads your PDF or image and auto-fills assessments, weights, and
      dates. <span style={{ color: "#818cf8" }}>Always review</span> the
      extracted data before saving.
    </p>
  </div>
);

// ─── Onboarding Card ───────────────────────────────────────────────────────

interface OnboardingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  showTooltip?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const OnboardingCard = ({
  icon,
  title,
  description,
  badge,
  showTooltip,
  onClick,
  disabled,
}: OnboardingCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    setHovered(true);
    if (showTooltip)
      tooltipTimeout.current = setTimeout(() => setTooltipVisible(true), 280);
  };
  const handleLeave = () => {
    setHovered(false);
    setTooltipVisible(false);
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        textAlign: "left",
        width: "100%",
        background: "none",
        border: "none",
        cursor: disabled ? "default" : "pointer",
        padding: 0,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {tooltipVisible && showTooltip && <IrisTooltip />}
      {/* glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: "20px",
          borderRadius: 20,
          backgroundColor: hovered ? "#111829" : "#0f1629",
          border: `1px solid ${hovered ? "rgba(99,102,241,0.38)" : "rgba(255,255,255,0.06)"}`,
          boxShadow: hovered
            ? "0 0 0 1px rgba(99,102,241,0.15), 0 16px 36px rgba(0,0,0,0.4)"
            : "0 4px 20px rgba(0,0,0,0.25)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: 12,
              backgroundColor: hovered
                ? "rgba(99,102,241,0.2)"
                : "rgba(99,102,241,0.1)",
              color: hovered ? "#a5b4fc" : "#818cf8",
              border: "1px solid rgba(99,102,241,0.18)",
              transition: "all 0.25s",
            }}
          >
            {icon}
          </div>
          {badge && (
            <span
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.04em",
                padding: "3px 9px",
                borderRadius: 20,
                backgroundColor: "rgba(99,102,241,0.14)",
                color: "#a5b4fc",
                border: "1px solid rgba(99,102,241,0.22)",
                whiteSpace: "nowrap",
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <div>
          <div
            style={{
              color: hovered ? "#f1f5f9" : "#e2e8f8",
              fontSize: 14.5,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              marginBottom: 6,
              transition: "color 0.2s",
            }}
          >
            {title}
          </div>
          <div style={{ color: "#5a6680", fontSize: 12.5, lineHeight: 1.65 }}>
            {description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: hovered ? "#818cf8" : "#3d4a62",
            fontSize: 12,
            fontWeight: 500,
            transform: hovered ? "translateX(2px)" : "translateX(0)",
            transition: "all 0.2s",
            marginTop: "auto",
          }}
        >
          <span>{disabled ? "Coming soon" : "Get started"}</span>
          <ArrowRightIcon />
        </div>
      </div>
    </button>
  );
};

// ─── NWU Search ────────────────────────────────────────────────────────────

interface NWUSearchViewProps {
  onBack: () => void;
  onSelectModule: (mod: Module) => void;
}

const NWUSearchView = ({ onBack, onSelectModule }: NWUSearchViewProps) => {
  const [query, setQuery] = useState("");
  const filtered = NWU_MODULES.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.code.toLowerCase().includes(query.toLowerCase()) ||
      (m.description ?? "").toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#080d1a",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.07) 0%, transparent 60%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 760,
          margin: "0 auto",
          padding: "clamp(28px,5vw,56px) clamp(16px,4vw,28px) 80px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#6b7a99",
            fontSize: 13,
            fontWeight: 500,
            padding: "6px 0",
            marginBottom: 32,
            fontFamily: "inherit",
            transition: "color 0.2s",
            WebkitTapHighlightColor: "transparent",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a99")}
        >
          <BackIcon />
          <span>Back</span>
        </button>

        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 34,
                height: 34,
                borderRadius: 10,
                backgroundColor: "rgba(99,102,241,0.12)",
                color: "#818cf8",
                border: "1px solid rgba(99,102,241,0.18)",
                flexShrink: 0,
              }}
            >
              <GraduationIcon />
            </div>
            <h1
              style={{
                color: "#f0f4ff",
                fontSize: "clamp(20px,3vw,26px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              NWU Module Templates
            </h1>
          </div>
          <p
            style={{
              color: "#6b7a99",
              fontSize: 13.5,
              lineHeight: 1.65,
              margin: "0 0 0 44px",
            }}
          >
            Pre-configured modules for North-West University. Select one to
            review and edit.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 24 }}>
          <div
            style={{
              position: "absolute",
              left: 13,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#6b7a99",
              pointerEvents: "none",
            }}
          >
            <SearchIcon />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or code…"
            style={{
              width: "100%",
              padding: "11px 13px 11px 38px",
              backgroundColor: "#0f1629",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              color: "#e2e8f8",
              fontSize: 14,
              outline: "none",
              fontFamily: "inherit",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
            }
          />
        </div>

        <div
          style={{
            color: "#6b7a99",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          {filtered.length} module{filtered.length !== 1 ? "s" : ""}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((mod) => (
            <NWUModuleCard
              key={mod.id}
              module={mod}
              onSelect={() => onSelectModule(mod)}
            />
          ))}
          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "#3d4a62",
                fontSize: 14,
              }}
            >
              No modules match &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NWUModuleCard = ({
  module: mod,
  onSelect,
}: {
  module: Module;
  onSelect: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const device = useMediaQuery();

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        textAlign: "left",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: device === "mobile" ? "flex-start" : "center",
          flexDirection: device === "mobile" ? "column" : "row",
          gap: device === "mobile" ? 12 : 16,
          padding: device === "mobile" ? "16px" : "16px 20px",
          backgroundColor: hovered ? "#111829" : "#0f1629",
          border: `1px solid ${hovered ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.06)"}`,
          borderRadius: 14,
          boxShadow: hovered
            ? "0 8px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(99,102,241,0.1)"
            : "0 2px 12px rgba(0,0,0,0.2)",
          transform: hovered ? "translateX(2px)" : "translateX(0)",
          transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Top row on mobile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: device === "mobile" ? "100%" : undefined,
            flex: device === "mobile" ? undefined : 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              flexShrink: 0,
              backgroundColor: mod.color + "22",
              border: `1px solid ${mod.color}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: 3,
                backgroundColor: mod.color,
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 3,
              }}
            >
              <span
                style={{
                  color: hovered ? "#f0f4ff" : "#e2e8f8",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {mod.name}
              </span>
              <span
                style={{
                  color: "#6b7a99",
                  fontSize: 11,
                  fontWeight: 500,
                  fontFamily: "JetBrains Mono, monospace",
                  flexShrink: 0,
                }}
              >
                {mod.code}
              </span>
            </div>
            <div
              style={{
                color: "#5a6680",
                fontSize: 12.5,
                lineHeight: 1.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: device === "mobile" ? "normal" : "nowrap",
              }}
            >
              {mod.description}
            </div>
          </div>
        </div>
        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: device === "mobile" ? "space-between" : "flex-end",
            gap: 16,
            width: device === "mobile" ? "100%" : undefined,
            flexShrink: 0,
          }}
        >
          <div style={{ textAlign: device === "mobile" ? "left" : "right" }}>
            <div
              style={{
                color: "#3d4a62",
                fontSize: 11,
                fontWeight: 500,
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {mod.addedYear}
            </div>
            <div style={{ color: "#3d4a62", fontSize: 11 }}>
              {mod.assessments.length} assessments
            </div>
          </div>
          <div
            style={{
              color: hovered ? "#818cf8" : "#2d3748",
              transition: "color 0.2s",
            }}
          >
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </button>
  );
};

// ─── Module Editor ─────────────────────────────────────────────────────────

const ASSESSMENT_TYPES: AssessmentType[] = [
  "weekly-test",
  "class-test",
  "semester-test",
  "exam",
  "assignment",
  "online-test",
  "attendance",
  "aleks",
  "class-work",
];
const COLOR_PRESETS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
  "#8b5cf6",
  "#ef4444",
  "#f97316",
];

interface ModuleEditorProps {
  initialModule: Module;
  isBlank: boolean;
  onBack: () => void;
}

const ModuleEditor = ({
  initialModule,
  isBlank,
  onBack,
}: ModuleEditorProps) => {
  const [mod, setMod] = useState<Module>(() =>
    JSON.parse(JSON.stringify(initialModule)),
  );
  const [section, setSection] = useState<EditorSection>("info");
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">(
    "idle",
  );
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const tabsRef = useRef<HTMLDivElement>(null);
  const device = useMediaQuery();

  const update = useCallback(
    <K extends keyof Module>(field: K, value: Module[K]) => {
      setSaveState("idle");
      setTouchedFields((prev) => new Set(prev).add(field as string));
      setMod((prev) => ({ ...prev, [field]: value }));
      // Clear error for this field once user edits it
      setValidationErrors((prev) => prev.filter((e) => e.field !== field));
    },
    [],
  );

  const updateAssessment = useCallback(
    (idx: number, field: keyof AssessmentComponent, value: unknown) => {
      setMod((prev) => {
        const assessments = [...prev.assessments];
        assessments[idx] = { ...assessments[idx], [field]: value };
        return { ...prev, assessments };
      });
      setSaveState("idle");
    },
    [],
  );

  const addAssessment = () => {
    const newA: AssessmentComponent = {
      id: `assessment-${Date.now()}`,
      name: "",
      type: "class-test",
      weight: 0,
      maxScore: 100,
    };
    setMod((prev) => ({ ...prev, assessments: [...prev.assessments, newA] }));
    setSection("assessments");
  };

  const removeAssessment = (idx: number) => {
    setMod((prev) => ({
      ...prev,
      assessments: prev.assessments.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = () => {
    const errors = validateModule(mod);
    if (errors.length > 0) {
      setValidationErrors(errors);
      setSaveState("error");
      // Mark all required fields as touched
      setTouchedFields((prev) => {
        const next = new Set(prev);
        errors.forEach((e) => next.add(e.field));
        return next;
      });
      return;
    }
    setValidationErrors([]);
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2600);
  };

  const jumpToSection = (s: EditorSection) => {
    setSection(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fieldHasError = (field: string) =>
    touchedFields.has(field) && validationErrors.some((e) => e.field === field);
  const fieldError = (field: string) =>
    validationErrors.find((e) => e.field === field)?.message;

  const sections: { id: EditorSection; label: string }[] = [
    { id: "info", label: "Module Info" },
    { id: "dates", label: "Dates" },
    { id: "requirements", label: "Requirements" },
    { id: "assessments", label: `Assessments (${mod.assessments.length})` },
  ];

  // Fields in current section that have errors
  const errorsInCurrentSection = validationErrors.filter(
    (e) => e.section === section,
  );
  const errorsBySection = sections.reduce(
    (acc, s) => {
      acc[s.id] = validationErrors.filter((e) => e.section === s.id).length;
      return acc;
    },
    {} as Record<EditorSection, number>,
  );

  const inputSt = (hasErr = false, focused = false): React.CSSProperties => ({
    width: "100%",
    padding: "9px 12px",
    backgroundColor: focused ? "#131f38" : "#0c1428",
    border: `1px solid ${hasErr ? "rgba(239,68,68,0.5)" : focused ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.07)"}`,
    borderRadius: 9,
    color: "#e2e8f8",
    fontSize: 13.5,
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s, background-color 0.2s",
    boxSizing: "border-box" as const,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#080d1a",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 860,
          margin: "0 auto",
          width: "100%",
          padding: device === "mobile" ? "24px 16px 80px" : "36px 24px 100px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Page heading */}
        <div>
          <div style={{ marginBottom: 3 }}>
            {isBlank ? (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#6b7a99",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                New Module
              </span>
            ) : (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#818cf8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "2px 8px",
                  backgroundColor: "rgba(99,102,241,0.1)",
                  borderRadius: 5,
                }}
              >
                NWU Template
              </span>
            )}
          </div>
          <h1
            style={{
              color: "#f0f4ff",
              fontSize: "clamp(20px,3.5vw,28px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            {mod.name || (isBlank ? "Untitled Module" : mod.code)}
          </h1>
          {mod.description && (
            <p
              style={{
                color: "#6b7a99",
                fontSize: 13.5,
                lineHeight: 1.65,
                margin: "6px 0 0",
              }}
            >
              {mod.description}
            </p>
          )}
        </div>

        {/* Validation error banner */}
        {saveState === "error" && validationErrors.length > 0 && (
          <div
            style={{
              backgroundColor: "rgba(239,68,68,0.07)",
              border: "1px solid rgba(239,68,68,0.22)",
              borderRadius: 12,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#fca5a5",
                fontSize: 12.5,
                fontWeight: 600,
              }}
            >
              <AlertIcon />
              <span>
                Fix {validationErrors.length} issue
                {validationErrors.length > 1 ? "s" : ""} before saving
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {validationErrors.map((e, i) => (
                <button
                  key={i}
                  onClick={() => jumpToSection(e.section)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    padding: "2px 0",
                    textAlign: "left",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "#6b7a99",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      fontWeight: 600,
                      minWidth: 80,
                      flexShrink: 0,
                    }}
                  >
                    {e.section}
                  </span>
                  <span style={{ color: "#f87171", fontSize: 12.5 }}>
                    {e.message}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Section tabs */}
        <div
          ref={tabsRef}
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 4,
              padding: 4,
              backgroundColor: "#0c1224",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.05)",
              width: "max-content",
              minWidth: "100%",
            }}
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                style={{
                  position: "relative",
                  padding: device === "mobile" ? "7px 13px" : "7px 18px",
                  borderRadius: 9,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: device === "mobile" ? 12.5 : 13,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  backgroundColor: section === s.id ? "#1e2540" : "transparent",
                  color: section === s.id ? "#e2e8f8" : "#6b7a99",
                  boxShadow:
                    section === s.id ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
                  transition: "all 0.18s",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {s.label}
                {/* Error badge on tab */}
                {errorsBySection[s.id] > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 3,
                      right: 4,
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Per-section error count hint */}
        {errorsInCurrentSection.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              color: "#f87171",
              fontSize: 12,
            }}
          >
            <AlertIcon />
            <span>
              {errorsInCurrentSection.length} field
              {errorsInCurrentSection.length > 1 ? "s" : ""} in this section
              need attention
            </span>
          </div>
        )}

        {/* ── Section: Info ── */}
        {section === "info" && (
          <EditorCard title="Module Information">
            <FieldGrid isMobile={device === "mobile"}>
              <Field
                label="Module Name"
                required
                error={
                  touchedFields.has("name") ? fieldError("name") : undefined
                }
              >
                <EInput
                  value={mod.name}
                  onChange={(v) => update("name", v)}
                  placeholder={
                    isBlank ? "e.g. Introduction to Programming" : ""
                  }
                  hasErr={fieldHasError("name")}
                  inputSt={inputSt}
                />
              </Field>
              <Field
                label="Module Code"
                required
                error={
                  touchedFields.has("code") ? fieldError("code") : undefined
                }
              >
                <EInput
                  value={mod.code}
                  onChange={(v) => update("code", v)}
                  placeholder={isBlank ? "e.g. CMPG121" : ""}
                  hasErr={fieldHasError("code")}
                  inputSt={inputSt}
                  mono
                />
              </Field>
              <Field
                label="Description"
                required
                full
                error={
                  touchedFields.has("description")
                    ? fieldError("description")
                    : undefined
                }
              >
                <ETextarea
                  value={mod.description ?? ""}
                  onChange={(v) => update("description", v)}
                  placeholder={isBlank ? "What is this module about…" : ""}
                  hasErr={fieldHasError("description")}
                  inputSt={inputSt}
                />
              </Field>
              <Field
                label="Added Year"
                required
                error={
                  touchedFields.has("addedYear")
                    ? fieldError("addedYear")
                    : undefined
                }
              >
                <EInput
                  type="number"
                  value={String(mod.addedYear ?? "")}
                  onChange={(v) => update("addedYear", Number(v))}
                  placeholder="e.g. 2026"
                  hasErr={fieldHasError("addedYear")}
                  inputSt={inputSt}
                  mono
                />
              </Field>
              <Field label="Lecturer">
                <EInput
                  value={mod.lecturer ?? ""}
                  onChange={(v) => update("lecturer", v)}
                  placeholder={isBlank ? "Dr Firstname Surname" : ""}
                  hasErr={false}
                  inputSt={inputSt}
                />
              </Field>
              <Field label="Email">
                <EInput
                  value={mod.email ?? ""}
                  onChange={(v) => update("email", v)}
                  placeholder={isBlank ? "lecturer@nwu.ac.za" : ""}
                  hasErr={false}
                  inputSt={inputSt}
                />
              </Field>
              <Field label="Office">
                <EInput
                  value={mod.office ?? ""}
                  onChange={(v) => update("office", v)}
                  placeholder={isBlank ? "e.g. PC-G3-119" : ""}
                  hasErr={false}
                  inputSt={inputSt}
                />
              </Field>
              <Field label="Consultation Hours">
                <EInput
                  value={mod.consultationHours ?? ""}
                  onChange={(v) => update("consultationHours", v)}
                  placeholder={isBlank ? "e.g. Mon/Wed 10:00–12:00" : ""}
                  hasErr={false}
                  inputSt={inputSt}
                />
              </Field>
              <Field
                label="Module Color"
                required
                error={
                  touchedFields.has("color") ? fieldError("color") : undefined
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {COLOR_PRESETS.map((c) => (
                    <button
                      key={c}
                      onClick={() => update("color", c)}
                      style={{
                        width: device === "mobile" ? 28 : 24,
                        height: device === "mobile" ? 28 : 24,
                        borderRadius: 6,
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: c,
                        flexShrink: 0,
                        boxShadow:
                          mod.color === c
                            ? `0 0 0 2px rgba(255,255,255,0.15), 0 0 0 4px ${c}55`
                            : "none",
                        transition: "box-shadow 0.2s",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    />
                  ))}
                  <input
                    type="color"
                    value={mod.color}
                    onChange={(e) => update("color", e.target.value)}
                    style={{
                      width: device === "mobile" ? 28 : 24,
                      height: device === "mobile" ? 28 : 24,
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      padding: 0,
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              </Field>
            </FieldGrid>
          </EditorCard>
        )}

        {/* ── Section: Dates ── */}
        {section === "dates" && (
          <EditorCard title="Semester & Exam Dates">
            <FieldGrid isMobile={device === "mobile"}>
              <Field
                label="Semester Start"
                required
                error={
                  touchedFields.has("semesterStart")
                    ? fieldError("semesterStart")
                    : undefined
                }
              >
                <EInput
                  type="date"
                  value={mod.semesterStart}
                  onChange={(v) => update("semesterStart", v)}
                  hasErr={fieldHasError("semesterStart")}
                  inputSt={inputSt}
                />
              </Field>
              <Field
                label="Semester End"
                required
                error={
                  touchedFields.has("semesterEnd")
                    ? fieldError("semesterEnd")
                    : undefined
                }
              >
                <EInput
                  type="date"
                  value={mod.semesterEnd}
                  onChange={(v) => update("semesterEnd", v)}
                  hasErr={fieldHasError("semesterEnd")}
                  inputSt={inputSt}
                />
              </Field>
              <Field label="Has Exam?" full>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {([true, false] as const).map((val) => (
                    <button
                      key={String(val)}
                      onClick={() => update("hasExam", val)}
                      style={{
                        padding: device === "mobile" ? "9px 22px" : "8px 20px",
                        borderRadius: 9,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontSize: 13,
                        fontWeight: 500,
                        backgroundColor:
                          mod.hasExam === val
                            ? "rgba(99,102,241,0.18)"
                            : "#0c1224",
                        color: mod.hasExam === val ? "#a5b4fc" : "#6b7a99",
                        border: `1px solid ${mod.hasExam === val ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.06)"}`,
                        transition: "all 0.2s",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {val ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </Field>
              {mod.hasExam && (
                <>
                  <Field
                    label="Exam Date"
                    required
                    error={
                      touchedFields.has("examDate")
                        ? fieldError("examDate")
                        : undefined
                    }
                  >
                    <EInput
                      type="date"
                      value={mod.examDate ?? ""}
                      onChange={(v) => update("examDate", v)}
                      hasErr={fieldHasError("examDate")}
                      inputSt={inputSt}
                    />
                  </Field>
                  <Field label="Exam End Date">
                    <EInput
                      type="date"
                      value={mod.examDateEnd ?? ""}
                      onChange={(v) => update("examDateEnd", v)}
                      hasErr={false}
                      inputSt={inputSt}
                    />
                  </Field>
                </>
              )}
            </FieldGrid>
          </EditorCard>
        )}

        {/* ── Section: Requirements ── */}
        {section === "requirements" && (
          <EditorCard title="Pass Requirements">
            <FieldGrid isMobile={device === "mobile"}>
              <Field label="Min Participation %" hint="For exam admission">
                <EInput
                  type="number"
                  value={String(mod.passRequirements?.participationMin ?? "")}
                  onChange={(v) =>
                    update("passRequirements", {
                      ...mod.passRequirements,
                      participationMin: Number(v),
                    })
                  }
                  placeholder="e.g. 40"
                  hasErr={false}
                  inputSt={inputSt}
                  mono
                />
              </Field>
              <Field label="Min Exam Mark %">
                <EInput
                  type="number"
                  value={String(mod.passRequirements?.examMin ?? "")}
                  onChange={(v) =>
                    update("passRequirements", {
                      ...mod.passRequirements,
                      examMin: Number(v),
                    })
                  }
                  placeholder="e.g. 40"
                  hasErr={false}
                  inputSt={inputSt}
                  mono
                />
              </Field>
              <Field label="Min Final Mark %">
                <EInput
                  type="number"
                  value={String(mod.passRequirements?.finalMin ?? "")}
                  onChange={(v) =>
                    update("passRequirements", {
                      ...mod.passRequirements,
                      finalMin: Number(v),
                    })
                  }
                  placeholder="e.g. 50"
                  hasErr={false}
                  inputSt={inputSt}
                  mono
                />
              </Field>
              <Field label="Min Completion %" hint="% of assessments">
                <EInput
                  type="number"
                  value={String(
                    mod.passRequirements?.minimumCompletionPercent ?? "",
                  )}
                  onChange={(v) =>
                    update("passRequirements", {
                      ...mod.passRequirements,
                      minimumCompletionPercent: Number(v),
                    })
                  }
                  placeholder="e.g. 80"
                  hasErr={false}
                  inputSt={inputSt}
                  mono
                />
              </Field>
              <Field label="Formula Min %">
                <EInput
                  type="number"
                  value={String(mod.participationFormula.minimumToPass)}
                  onChange={(v) =>
                    update("participationFormula", {
                      ...mod.participationFormula,
                      minimumToPass: Number(v),
                    })
                  }
                  hasErr={false}
                  inputSt={inputSt}
                  mono
                />
              </Field>
            </FieldGrid>
          </EditorCard>
        )}

        {/* ── Section: Assessments ── */}
        {section === "assessments" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mod.assessments.map((a, idx) => (
              <AssessmentRow
                key={a.id}
                assessment={a}
                idx={idx}
                onChange={updateAssessment}
                onRemove={() => removeAssessment(idx)}
                inputSt={inputSt}
                isBlank={isBlank}
                isMobile={device === "mobile"}
              />
            ))}
            {mod.assessments.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 0",
                  color: "#3d4a62",
                  fontSize: 14,
                  border: "1px dashed rgba(255,255,255,0.06)",
                  borderRadius: 14,
                }}
              >
                No assessments yet. Add one below.
              </div>
            )}
            <button
              onClick={addAssessment}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                padding: device === "mobile" ? 15 : 13,
                backgroundColor: "transparent",
                border: "1px dashed rgba(99,102,241,0.22)",
                borderRadius: 12,
                cursor: "pointer",
                fontFamily: "inherit",
                color: "#6b7a99",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.2s",
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
                e.currentTarget.style.color = "#a5b4fc";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.22)";
                e.currentTarget.style.color = "#6b7a99";
              }}
            >
              <PlusIcon /> Add Assessment
            </button>
          </div>
        )}

        <div
          style={{
            padding: device === "mobile" ? "0 16px" : "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 54,
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: device === "mobile" ? 8 : 12,
              minWidth: 0,
              flex: 1,
            }}
          >
            <button
              onClick={onBack}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#6b7a99",
                fontSize: 13,
                fontWeight: 500,
                fontFamily: "inherit",
                padding: "4px 0",
                transition: "color 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a99")}
            >
              <BackIcon />
              <span>Back</span>
            </button>
          </div>

          <button
            onClick={handleSave}
            style={{
              padding: device === "mobile" ? "6px 14px" : "7px 18px",
              flexShrink: 0,
              backgroundColor:
                saveState === "saved"
                  ? "rgba(16,185,129,0.15)"
                  : saveState === "error"
                    ? "rgba(239,68,68,0.12)"
                    : "rgba(99,102,241,0.18)",
              border: `1px solid ${saveState === "saved" ? "rgba(16,185,129,0.3)" : saveState === "error" ? "rgba(239,68,68,0.3)" : "rgba(99,102,241,0.3)"}`,
              borderRadius: 9,
              color:
                saveState === "saved"
                  ? "#6ee7b7"
                  : saveState === "error"
                    ? "#fca5a5"
                    : "#a5b4fc",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.3s",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {saveState === "saved"
              ? "✓ Saved"
              : saveState === "error"
                ? `${validationErrors.length} error${validationErrors.length > 1 ? "s" : ""}`
                : "Save Module"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Assessment Row ────────────────────────────────────────────────────────

const AssessmentRow = ({
  assessment: a,
  idx,
  onChange,
  onRemove,
  inputSt,
  isBlank,
  isMobile,
}: {
  assessment: AssessmentComponent;
  idx: number;
  onChange: (i: number, f: keyof AssessmentComponent, v: unknown) => void;
  onRemove: () => void;
  inputSt: (hasErr?: boolean, focused?: boolean) => React.CSSProperties;
  isBlank: boolean;
  isMobile: boolean;
}) => {
  const [expanded, setExpanded] = useState(isBlank);

  return (
    <div
      style={{
        backgroundColor: "#0f1629",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setExpanded((e) => !e)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: isMobile ? "13px 15px" : "13px 18px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background-color 0.2s",
          WebkitTapHighlightColor: "transparent",
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: 2,
            backgroundColor: "#6366f1",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            flex: 1,
            color: "#e2e8f8",
            fontSize: 13.5,
            fontWeight: 500,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {a.name || "Untitled Assessment"}
        </span>
        {!isMobile && (
          <span
            style={{
              color: "#6b7a99",
              fontSize: 11,
              fontFamily: "JetBrains Mono, monospace",
              flexShrink: 0,
            }}
          >
            {a.type}
          </span>
        )}
        {!isMobile && a.date && (
          <span
            style={{
              color: "#4a5568",
              fontSize: 11,
              fontFamily: "JetBrains Mono, monospace",
              flexShrink: 0,
            }}
          >
            {a.date}
          </span>
        )}
        <span
          style={{
            color: "#4a5568",
            fontSize: 11,
            fontFamily: "JetBrains Mono, monospace",
            flexShrink: 0,
          }}
        >
          {a.weight}%
        </span>
        <span
          style={{
            color: expanded ? "#818cf8" : "#4a5568",
            fontSize: 12,
            transition: "transform 0.2s, color 0.2s",
            transform: expanded ? "rotate(180deg)" : "rotate(0)",
            flexShrink: 0,
          }}
        >
          ▾
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#4a5568",
            padding: 4,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            transition: "color 0.2s",
            WebkitTapHighlightColor: "transparent",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4a5568")}
        >
          <TrashIcon />
        </button>
      </button>

      {expanded && (
        <div
          style={{
            padding: isMobile ? "0 14px 16px" : "0 18px 18px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 12,
              paddingTop: 16,
            }}
          >
            <SmallField label="Name">
              <EInput
                value={a.name}
                onChange={(v) => onChange(idx, "name", v)}
                placeholder="Assessment name…"
                hasErr={false}
                inputSt={inputSt}
              />
            </SmallField>
            <SmallField label="Type">
              <ESelect
                value={a.type}
                onChange={(v) => onChange(idx, "type", v as AssessmentType)}
                options={ASSESSMENT_TYPES}
                inputSt={inputSt}
              />
            </SmallField>
            <SmallField label="Weight %">
              <EInput
                type="number"
                value={String(a.weight)}
                onChange={(v) => onChange(idx, "weight", Number(v))}
                hasErr={false}
                inputSt={inputSt}
                mono
              />
            </SmallField>
            <SmallField label="Max Score">
              <EInput
                type="number"
                value={String(a.maxScore)}
                onChange={(v) => onChange(idx, "maxScore", Number(v))}
                hasErr={false}
                inputSt={inputSt}
                mono
              />
            </SmallField>
            <SmallField label="Date">
              <EInput
                type="date"
                value={a.date ?? ""}
                onChange={(v) => onChange(idx, "date", v)}
                hasErr={false}
                inputSt={inputSt}
              />
            </SmallField>
            <SmallField label="Duration">
              <EInput
                value={a.duration ?? ""}
                onChange={(v) => onChange(idx, "duration", v)}
                placeholder="e.g. 1.5 hours"
                hasErr={false}
                inputSt={inputSt}
              />
            </SmallField>
            <SmallField label="Location">
              <EInput
                value={a.location ?? ""}
                onChange={(v) => onChange(idx, "location", v)}
                placeholder="e.g. PC-E8-G34"
                hasErr={false}
                inputSt={inputSt}
              />
            </SmallField>
            <SmallField label="Study Units">
              <EInput
                value={a.studyUnits ?? ""}
                onChange={(v) => onChange(idx, "studyUnits", v)}
                placeholder="e.g. SU 1–3"
                hasErr={false}
                inputSt={inputSt}
              />
            </SmallField>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Editor sub-components ─────────────────────────────────────────────────

const EditorCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      backgroundColor: "#0c1224",
      border: "1px solid rgba(255,255,255,0.05)",
      borderRadius: 16,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        padding: "14px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <span style={{ color: "#a0aec0", fontSize: 13, fontWeight: 600 }}>
        {title}
      </span>
    </div>
    <div style={{ padding: 20 }}>{children}</div>
  </div>
);

const FieldGrid = ({
  children,
  isMobile,
}: {
  children: React.ReactNode;
  isMobile: boolean;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit, minmax(220px, 1fr))",
      gap: isMobile ? 14 : 18,
    }}
  >
    {children}
  </div>
);

const Field = ({
  label,
  hint,
  required,
  full,
  error,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  full?: boolean;
  error?: string;
  children: React.ReactNode;
}) => (
  <div style={{ gridColumn: full ? "1 / -1" : undefined }}>
    <div
      style={{
        marginBottom: 6,
        display: "flex",
        alignItems: "baseline",
        gap: 5,
      }}
    >
      <label
        style={{
          color: "#6b7a99",
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </label>
      {required && (
        <span
          style={{
            color: "#ef4444",
            fontSize: 12,
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          *
        </span>
      )}
      {hint && <span style={{ color: "#3d4a62", fontSize: 11 }}>{hint}</span>}
    </div>
    {children}
    {error && (
      <div
        style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}
      >
        <AlertIcon />
        <span style={{ color: "#f87171", fontSize: 11.5 }}>{error}</span>
      </div>
    )}
  </div>
);

const SmallField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <label
      style={{
        display: "block",
        marginBottom: 5,
        color: "#6b7a99",
        fontSize: 10.5,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      {label}
    </label>
    {children}
  </div>
);

interface EInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hasErr: boolean;
  inputSt: (hasErr?: boolean, focused?: boolean) => React.CSSProperties;
  mono?: boolean;
}

const EInput = ({
  value,
  onChange,
  placeholder,
  type = "text",
  hasErr,
  inputSt,
  mono,
}: EInputProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputSt(hasErr, focused),
        fontFamily: mono ? "JetBrains Mono, monospace" : "inherit",
      }}
    />
  );
};

const ETextarea = ({
  value,
  onChange,
  placeholder,
  hasErr,
  inputSt,
}: Omit<EInputProps, "type" | "mono">) => {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...inputSt(hasErr, focused), resize: "vertical", minHeight: 80 }}
    />
  );
};

const ESelect = ({
  value,
  onChange,
  options,
  inputSt,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  inputSt: (hasErr?: boolean, focused?: boolean) => React.CSSProperties;
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputSt(false, focused),
        cursor: "pointer",
        appearance: "auto",
      }}
    >
      {options.map((o) => (
        <option key={o} value={o} style={{ backgroundColor: "#0f1629" }}>
          {o}
        </option>
      ))}
    </select>
  );
};

// ─── Empty State ───────────────────────────────────────────────────────────

const EmptyState = ({
  onNWUClick,
  onBlankClick,
}: {
  onNWUClick: () => void;
  onBlankClick: () => void;
}) => {
  const device = useMediaQuery();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#080d1a",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.08) 0%, transparent 60%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 920,
          margin: "0 auto",
          padding: device === "mobile" ? "36px 16px 72px" : "52px 28px 80px",
        }}
      >
        {/* Heading */}
        <div style={{ marginBottom: device === "mobile" ? 40 : 52 }}>
          <h1
            style={{
              color: "#f0f4ff",
              fontSize: "clamp(24px,5vw,38px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              margin: "0 0 8px",
            }}
          >
            Add a Module
          </h1>
          <p
            style={{
              color: "#6b7a99",
              fontSize: device === "mobile" ? 14 : 14.5,
              lineHeight: 1.7,
              maxWidth: 400,
              margin: 0,
            }}
          >
            Manage your courses, assessments, study progress, and AI context.
          </p>
        </div>

        {/* Illustration */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: device === "mobile" ? 40 : 52,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: device === "mobile" ? 240 : 300,
              height: device === "mobile" ? 150 : 180,
            }}
          >
            <BookStackIllustration />
          </div>
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <p style={{ color: "#6b7a99", fontSize: 13.5, margin: 0 }}>
              Choose how you&apos;d like to add your module.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              device === "mobile"
                ? "1fr"
                : "repeat(auto-fit, minmax(250px, 1fr))",
            gap: device === "mobile" ? 12 : 14,
            alignItems: "stretch",
          }}
        >
          <OnboardingCard
            icon={<DocumentIcon />}
            title="Upload Assessment Guide"
            description="Let Iris create your module from a PDF or image by extracting assessments, semester dates, and exam information."
            badge="Recommended"
            showTooltip
            onClick={() => {}}
            disabled
          />
          <OnboardingCard
            icon={<GraduationIcon />}
            title="NWU Module Template"
            description="Preconfigured grading, semester dates, and assessment structure for North-West University modules."
            onClick={onNWUClick}
          />
          <OnboardingCard
            icon={<EditIcon />}
            title="Blank Module"
            description="Create and customize everything manually from scratch."
            onClick={onBlankClick}
          />
        </div>
      </div>
    </div>
  );
};

// ─── Root ──────────────────────────────────────────────────────────────────

export default function AddModule() {
  const [view, setView] = useState<AppView>("empty");
  const [editorModule, setEditorModule] = useState<Module | null>(null);
  const [isBlank, setIsBlank] = useState(false);

  const openEditor = (mod: Module, blank: boolean) => {
    setEditorModule(mod);
    setIsBlank(blank);
    setView("editor");
    window.scrollTo(0, 0);
  };

  if (view === "nwu-search") {
    return (
      <NWUSearchView
        onBack={() => setView("empty")}
        onSelectModule={(mod) => openEditor(mod, false)}
      />
    );
  }

  if (view === "editor" && editorModule) {
    return (
      <ModuleEditor
        initialModule={editorModule}
        isBlank={isBlank}
        onBack={() => setView(isBlank ? "empty" : "nwu-search")}
      />
    );
  }

  return (
    <EmptyState
      onNWUClick={() => setView("nwu-search")}
      onBlankClick={() => openEditor(BLANK_MODULE, true)}
    />
  );
}
