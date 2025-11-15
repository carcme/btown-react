import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface SvgIconProps {
  svg: string | HTMLElement;
  size?: number;
  className?: string;
}

export function DivIconToSvgIcon({ svg, size = 24, className }: SvgIconProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing contents
    container.innerHTML = "";

    if (typeof svg === "string") {
      svg = svg.replace("fill=#0070F3", "fill=#000000");
      svg = svg.replace("stroke-width=2", "stroke-width=1.5");
      container.innerHTML = svg;
    } else if (svg instanceof HTMLElement) {
      // append a clone so we don't move the original element out of the Leaflet icon
      container.appendChild(svg.cloneNode(true));
    }
  }, [svg]);

  return (
    <div
      ref={containerRef}
      className={cn("inline-block ", className)}
      style={{ width: size, height: size }}
    />
  );
}
