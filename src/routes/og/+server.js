/**
 * Dynamic OG image endpoint — returns an SVG generated server-side.
 * Works on Cloudflare Pages / Workers with zero dependencies.
 * URL: /og?title=...&subtitle=...
 */
export async function GET({ url }) {
	const title = url.searchParams.get('title') ?? 'Joseph Avila';
	const subtitle = url.searchParams.get('subtitle') ?? 'Clojure Developer · Data Science · AI Engineer';

	const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Dot grid pattern -->
    <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#222222"/>
    </pattern>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&amp;display=swap');
    </style>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#090909"/>
  <rect width="1200" height="630" fill="url(#dots)"/>

  <!-- Left accent bar -->
  <rect x="72" y="160" width="4" height="310" fill="#ff3333" rx="2"/>

  <!-- Name -->
  <text x="112" y="285"
    font-family="'Space Mono', 'Courier New', monospace"
    font-size="84"
    font-weight="700"
    fill="#f0f0f0"
    letter-spacing="-3">${escapeXml(title)}</text>

  <!-- Domain -->
  <text x="112" y="355"
    font-family="'Space Mono', 'Courier New', monospace"
    font-size="28"
    fill="#ff3333"
    letter-spacing="1">josephinoo.dev</text>

  <!-- Subtitle -->
  <text x="112" y="408"
    font-family="'Space Mono', 'Courier New', monospace"
    font-size="22"
    fill="#666666">${escapeXml(subtitle)}</text>

  <!-- Asterisk (right side) — 3 bars at 0°, 60°, -60° -->
  <g transform="translate(980, 315)">
    <rect x="-12" y="-120" width="24" height="240" rx="6" fill="#ff3333"/>
    <rect x="-12" y="-120" width="24" height="240" rx="6" fill="#ff3333" transform="rotate(60)"/>
    <rect x="-12" y="-120" width="24" height="240" rx="6" fill="#ff3333" transform="rotate(-60)"/>
  </g>

  <!-- Dashed circle around asterisk -->
  <circle cx="980" cy="315" r="160"
    fill="none"
    stroke="#333333"
    stroke-width="1"
    stroke-dasharray="6 6"/>
</svg>`.trim();

	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml',
			'Cache-Control': 'public, max-age=86400'
		}
	});
}

/** Escape XML special chars so text is safe inside SVG */
function escapeXml(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
