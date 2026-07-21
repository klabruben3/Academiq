export function EmptyScreen({ text }: { text: string }) {
  return (
    <div className="flex h-screen items-center justify-center select-none">
      <span className="text-foreground font-mono text-xs">{text}</span>
    </div>
  );
}
export default function LoadingScreen() {
  return <EmptyScreen text="Loading..." />;
}
