export function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ marginBottom: "1rem", paddingLeft: "0" }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            marginBottom: "0.5rem",
            fontSize: "1rem",
            lineHeight: "1.75",
            color: "#8b9cc8",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#6366f1",
              flexShrink: 0,
              marginTop: "0.65rem",
            }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
