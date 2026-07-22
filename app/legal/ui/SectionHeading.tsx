export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "#f0f4ff",
        marginBottom: "0.75rem",
        marginTop: "2.5rem",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}
