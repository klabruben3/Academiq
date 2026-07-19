interface ProgressBarProps {
  value: number;
  color?: string;
  className?: string;
}

export function ProgressBar({
  value,
  color = "#6366f1",
  className = "",
}: ProgressBarProps) {
  return (
    <div
      className={`h-1.5 rounded-full bg-white/10 overflow-hidden ${className}`}
    >
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min(100, value)}%`, backgroundColor: color }}
      />
    </div>
  );
}
