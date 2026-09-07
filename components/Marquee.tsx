export function Marquee({ items }: { items: string[] }) {
  const track = (
    <div className="marquee__track" aria-hidden="true">
      {items.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
          <span className="marquee__dot" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      {track}
      {track}
      <span className="sr-only">{items.join(", ")}</span>
    </div>
  );
}
