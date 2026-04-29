"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";

function buildFaviconSVG(isDark: boolean): string {
  const bg = isDark ? "#0c0a09" : "#ffffff";
  const primary = "#f97316";
  const text = isDark ? "#ffffff" : "#1c1917";

  // "DB" monogram with animated glow ring
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <defs>
      <style>
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .ring {
          transform-origin: 32px 32px;
          animation: spin 8s linear infinite;
        }
        .glow {
          animation: pulse 2s ease-in-out infinite;
        }
      </style>
    </defs>

    <!-- Background circle -->
    <circle cx="32" cy="32" r="30" fill="${bg}" />

    <!-- Outer glow ring (animated) -->
    <circle 
      class="glow"
      cx="32" cy="32" r="29" 
      fill="none" 
      stroke="${primary}" 
      stroke-width="2"
      stroke-dasharray="6 4"
      opacity="0.7"
    />

    <!-- Spinning dashed ring -->
    <circle 
      class="ring"
      cx="32" cy="32" r="26" 
      fill="none" 
      stroke="${primary}" 
      stroke-width="1.5"
      stroke-dasharray="3 8"
      opacity="0.4"
    />

    <!-- Inner filled circle -->
    <circle cx="32" cy="32" r="22" fill="${primary}" opacity="0.12" />

    <!-- "D" letter -->
    <text 
      x="13" y="42" 
      font-family="Georgia, serif" 
      font-size="26" 
      font-weight="900" 
      fill="${primary}"
      letter-spacing="-2"
    >DB</text>
  </svg>`;
}

function svgToDataURL(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default function AnimatedFavicon() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    const svgString = buildFaviconSVG(isDark);
    const dataURL = svgToDataURL(svgString);

    // Remove existing favicon links
    const existingLinks = document.querySelectorAll("link[rel~='icon']");
    existingLinks.forEach((el) => el.remove());

    // Add new favicon
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = dataURL;
    document.head.appendChild(link);
  }, [resolvedTheme]);

  return null; // renders nothing visible
}
