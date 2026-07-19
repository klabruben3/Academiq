interface BadgeProps {
  color: string;
  label: string;
  small?: boolean;
}

export function TypeBadge({ color, label, small }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded font-mono font-medium uppercase tracking-wider ${small ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-xs"}`}
      style={{
        backgroundColor: `${color}22`,
        color,
        border: `1px solid ${color}44`,
      }}
    >
      {label}
    </span>
  );
}
