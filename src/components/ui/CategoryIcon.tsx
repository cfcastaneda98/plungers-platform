interface CategoryIconProps {
  /** Category slug, e.g. "heritage-history" — matches public/icons/<slug>.svg */
  slug: string;
  /** Rendered size in px (the artwork fills its artboard edge to edge). */
  size?: number;
  /** Any CSS color; the single-color SVG is tinted with it. */
  color: string;
}

/**
 * Renders one of the custom category SVGs from /public/icons, tinted with the
 * given color (the SVG is used as a mask over a solid-color box).
 */
export default function CategoryIcon({ slug, size = 20, color }: CategoryIconProps) {
  const url = `url(/icons/${slug}.svg)`;
  return (
    <span
      aria-hidden="true"
      style={{
        display: "block",
        flexShrink: 0,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}