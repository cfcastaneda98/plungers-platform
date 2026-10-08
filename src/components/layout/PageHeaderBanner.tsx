import type { CSSProperties, ReactNode } from "react";

interface PageHeaderBannerProps {
  /** Background photo for the banner. */
  imageUrl: string;
  children: ReactNode;
  /** Space above the content (clears the fixed navbar). */
  paddingTop?: string;
  paddingBottom?: string;
  /** Extra class on the outer band, e.g. "section-pad" for mobile side padding. */
  className?: string;
  style?: CSSProperties;
}

/**
 * Dark-teal page header with a photo behind it, matching the Experiences page.
 * Pure markup/CSS (no hooks), so it works in both server and client components.
 */
export default function PageHeaderBanner({
  imageUrl,
  children,
  paddingTop = "12rem",
  paddingBottom = "2.5rem",
  className,
  style,
}: PageHeaderBannerProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#062626", // fallback while the image loads
        paddingTop,
        paddingBottom,
        paddingLeft: "80px",
        paddingRight: "80px",
        ...style,
      }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(6,38,38,0.92) 0%, rgba(6,38,38,0.8) 55%, rgba(0,111,107,0.55) 100%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}