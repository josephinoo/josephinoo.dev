import { error } from '@sveltejs/kit';

// Redirect to the pre-generated static OG image
export function GET({ params }) {
	const { slug } = params;

	// Verify the slug looks valid (basic sanitization)
	if (!/^[a-z0-9-]+$/.test(slug)) {
		throw error(400, 'Invalid slug');
	}

	// Redirect to the static file
	return new Response(null, {
		status: 302,
		headers: {
			Location: `/og/${slug}.png`,
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	});
}
