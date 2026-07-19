interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

export function StatCard({ label, value, sub, color }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/4 p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-1">
        {label}
      </p>
      <p
        className="text-2xl font-mono font-semibold"
        style={{ color: color ?? "#fff" }}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-white/40 mt-0.5">{sub}</p>}
    </div>
  );
}
