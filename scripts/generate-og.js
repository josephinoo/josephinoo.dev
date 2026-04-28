import fs from 'fs';
import path from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const POSTS_DIR = path.resolve('src/posts');
const OUTPUT_DIR = path.resolve('static/og');

// Ensure output dir exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Load font
const fontPath = path.resolve('static/Inter.woff');
const fontData = fs.readFileSync(fontPath);

// Parse frontmatter from markdown
function parseFrontmatter(content) {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return {};
	const meta = {};
	for (const line of match[1].split('\n')) {
		const [key, ...rest] = line.split(':');
		if (!key) continue;
		let value = rest.join(':').trim();
		// Handle arrays like tags: ['a', 'b']
		if (value.startsWith('[')) {
			value = value.replace(/[\[\]']/g, '').split(',').map(s => s.trim()).filter(Boolean);
		}
		// Handle booleans
		if (value === 'true') value = true;
		if (value === 'false') value = false;
		meta[key.trim()] = value;
	}
	return meta;
}

async function generateOGImage(slug, meta) {
	const title = meta.title || slug;
	const description = meta.description || '';
	const tags = Array.isArray(meta.tags) ? meta.tags.slice(0, 3) : [];
	const date = meta.date || '';

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '1200px',
					height: '630px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
					padding: '80px',
					fontFamily: 'Inter'
				},
				children: [
					// Top: Brand
					{
						type: 'div',
						props: {
							style: { display: 'flex', alignItems: 'center', gap: '12px' },
							children: [
								{
									type: 'div',
									props: {
										style: {
											color: '#FF4B4B',
											fontSize: '20px',
											fontWeight: 700,
											letterSpacing: '0.1em'
										},
										children: 'JOSEPHINOO.DEV'
									}
								},
								{
									type: 'div',
									props: { style: { color: '#333', fontSize: '20px' }, children: '/' }
								},
								{
									type: 'div',
									props: { style: { color: '#666', fontSize: '20px' }, children: 'BLOG' }
								}
							]
						}
					},
					// Center: Title + Description
					{
						type: 'div',
						props: {
							style: { display: 'flex', flexDirection: 'column', gap: '24px' },
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontSize: '56px',
											fontWeight: 700,
											color: '#ffffff',
											lineHeight: 1.15,
											letterSpacing: '-0.02em',
											maxWidth: '980px'
										},
										children: title
									}
								},
								description
									? {
											type: 'div',
											props: {
												style: {
													fontSize: '22px',
													color: '#999',
													lineHeight: 1.5,
													maxWidth: '850px'
												},
												children: description.length > 120
													? description.substring(0, 117) + '...'
													: description
											}
										}
									: null
							].filter(Boolean)
						}
					},
					// Bottom: Tags + Date
					{
						type: 'div',
						props: {
							style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
							children: [
								{
									type: 'div',
									props: {
										style: { display: 'flex', gap: '10px' },
										children: tags.map((tag) => ({
											type: 'div',
											props: {
												style: {
													color: '#FF4B4B',
													fontSize: '14px',
													fontWeight: 600,
													background: 'rgba(255,75,75,0.08)',
													border: '1px solid rgba(255,75,75,0.25)',
													borderRadius: '6px',
													padding: '6px 14px',
													textTransform: 'uppercase',
													letterSpacing: '0.05em'
												},
												children: `#${tag}`
											}
										}))
									}
								},
								{
									type: 'div',
									props: { style: { color: '#555', fontSize: '16px' }, children: date }
								}
							]
						}
					}
				]
			}
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Inter',
					data: fontData,
					weight: 700,
					style: 'normal'
				}
			]
		}
	);

	const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
	const png = resvg.render().asPng();

	const outPath = path.join(OUTPUT_DIR, `${slug}.png`);
	fs.writeFileSync(outPath, png);
	console.log(`✅ Generated: ${outPath}`);
}

// Main
async function main() {
	const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

	for (const file of files) {
		const slug = file.replace('.md', '');
		const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
		const meta = parseFrontmatter(content);

		if (meta.published === false) {
			console.log(`⏭️  Skipping (unpublished): ${slug}`);
			continue;
		}

		await generateOGImage(slug, meta);
	}

	console.log('\n🎉 All OG images generated!');
}

main().catch((e) => {
	console.error('Failed to generate OG images:', e);
	process.exit(1);
});
