/**
 * Monochrome hairline "plates" — the art direction in place of photography.
 * Everything is deterministic so server and client render identical markup.
 */

type PlateProps = {
  variant?: "colonnade" | "arcs" | "strata" | "monogram";
  ratio?: string;
  className?: string;
  seed?: number;
  /** Letters for the `monogram` variant. */
  initials?: string;
};

/** Small deterministic pseudo-random source; keeps SSR and hydration in step. */
function noise(seed: number) {
  let value = seed * 9301 + 49297;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export function Plate({
  variant = "colonnade",
  ratio = "3 / 4",
  className,
  seed = 7,
  initials = "OL",
}: PlateProps) {
  return (
    <div
      className={["plate", className ?? ""].filter(Boolean).join(" ")}
      style={{ aspectRatio: ratio }}
      aria-hidden="true"
    >
      {variant === "colonnade" ? <Colonnade seed={seed} /> : null}
      {variant === "arcs" ? <Arcs /> : null}
      {variant === "strata" ? <Strata seed={seed} /> : null}
      {variant === "monogram" ? (
        <Monogram seed={seed} initials={initials} />
      ) : null}
      <span className="plate__frame" />
    </div>
  );
}

/* A colonnade of hairlines under a shallow arch — a nod to a courthouse
   elevation, abstracted down to line weight alone. */
function Colonnade({ seed }: { seed: number }) {
  const rand = noise(seed);
  const columns = Array.from({ length: 46 }, (_, i) => {
    const x = (i / 45) * 100;
    // Fluting: alternating heavy and hairline shafts, jittered so the field
    // shimmers rather than reading as a flat screen.
    const weight = (i % 3 === 0 ? 0.9 : 0.28) + rand() * 0.5;
    return { x, weight };
  });

  // The colonnade springs at y=48, is capped by a semicircular arch and lands
  // on a plinth at y=112. Everything below the plinth is left as clear paper.
  const ARCH = "M6 112 V48 A44 40 0 0 1 94 48 V112 Z";

  return (
    <svg viewBox="0 0 100 128" preserveAspectRatio="none" role="presentation">
      <defs>
        <linearGradient id={`pl-fade-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.05" />
          <stop offset="22%" stopColor="var(--ink)" stopOpacity="0.9" />
          <stop offset="70%" stopColor="var(--ink)" stopOpacity="0.62" />
          <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={`pl-wash-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.24" />
          <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.05" />
        </linearGradient>
        <clipPath id={`pl-arch-${seed}`}>
          <path d={ARCH} />
        </clipPath>
      </defs>

      <g clipPath={`url(#pl-arch-${seed})`}>
        <rect x="0" y="0" width="100" height="128" fill={`url(#pl-wash-${seed})`} />
        {columns.map((column) => (
          <rect
            key={column.x}
            x={column.x}
            y={0}
            width={column.weight * 0.42}
            height={128}
            fill={`url(#pl-fade-${seed})`}
          />
        ))}
      </g>

      <path
        d={ARCH}
        fill="none"
        stroke="var(--ink)"
        strokeOpacity="0.45"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      {/* Plinth */}
      {[112, 117, 124].map((y, i) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="100"
          y2={y}
          stroke="var(--ink)"
          strokeOpacity={0.45 - i * 0.15}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/* Concentric rings sprung from the lower-left and cropped by the frame —
   an abstract impression of a seal pressed into the page. */
function Arcs() {
  const rings = Array.from({ length: 26 }, (_, i) => 5 + i * 5.4);

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" role="presentation">
      <g transform="translate(26 74)">
        {rings.map((r, i) => (
          <circle
            key={r}
            r={r}
            fill="none"
            stroke="var(--ink)"
            strokeOpacity={0.42 - (i / rings.length) * 0.3}
            strokeWidth={i % 5 === 0 ? 1.3 : 0.7}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      <line
        x1="0"
        y1="74"
        x2="100"
        y2="74"
        stroke="var(--ink)"
        strokeOpacity="0.34"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* A set monogram over a ruled field — a considered stand-in until a portrait
   or a photographed mark is supplied. */
function Monogram({ seed, initials }: { seed: number; initials: string }) {
  const rand = noise(seed);
  const rules = Array.from({ length: 26 }, (_, i) => ({
    y: 4 + i * 3.7,
    opacity: 0.05 + rand() * 0.2,
  }));

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" role="presentation">
      {rules.map((rule) => (
        <line
          key={rule.y}
          x1="0"
          y1={rule.y}
          x2="100"
          y2={rule.y}
          stroke="var(--ink)"
          strokeOpacity={rule.opacity}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontFamily: "var(--font-serif)", fontSize: "46px" }}
        fill="var(--ink)"
        fillOpacity="0.9"
        letterSpacing="1"
      >
        {initials}
      </text>

      <line
        x1="16"
        y1="76"
        x2="84"
        y2="76"
        stroke="var(--ink)"
        strokeOpacity="0.4"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* Ruled strata — horizontal hairlines that compress towards the base, like the
   edge of a stack of paper seen side on. */
function Strata({ seed }: { seed: number }) {
  const rand = noise(seed);
  const COUNT = 30;
  const lines = Array.from({ length: COUNT + 1 }, (_, i) => {
    const t = i / COUNT;
    return {
      y: 100 * (1 - Math.pow(1 - t, 2.2)),
      opacity: 0.14 + t * 0.4 + rand() * 0.1,
      heavy: i % 6 === 0,
    };
  });

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="presentation">
      {lines.map((line) => (
        <line
          key={line.y}
          x1={line.heavy ? 0 : 8}
          y1={line.y}
          x2={line.heavy ? 100 : 92}
          y2={line.y}
          stroke="var(--ink)"
          strokeOpacity={line.heavy ? Math.min(0.72, line.opacity + 0.2) : line.opacity}
          strokeWidth={line.heavy ? 1.4 : 1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
