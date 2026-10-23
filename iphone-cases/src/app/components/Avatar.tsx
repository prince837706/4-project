export default function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return (
    <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.4 }} aria-label={name}>
      {initials || "?"}
    </div>
  );
}