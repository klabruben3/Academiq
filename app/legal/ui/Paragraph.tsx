export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "1rem",
        lineHeight: "1.8",
        color: "#8b9cc8",
        marginBottom: "1rem",
      }}
    >
      {children}
    </p>
  );
}
