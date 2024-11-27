// Replace this:
// const fetch = require('node-fetch');

// With this:
const fetch = await import('node-fetch');

export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required.' });
    }

    // Log the incoming request for debugging
    console.log(`Fetching URL: ${url}`);

    try {
        const response = await fetch(url);

        // Check if the response is valid
        if (!response.ok) {
            throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type') || 'text/html';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Handle binary content (e.g., images, videos)
        if (contentType.includes('image') || contentType.includes('audio') || contentType.includes('video')) {
            const buffer = await response.buffer();
            res.status(200).send(buffer);
        } else {
            const body = await response.text();
            res.status(200).send(body);
        }
    } catch (error) {
        // Log the detailed error for debugging
        console.error('Proxy error:', error);

        // Return a more specific error message
        if (error.message.includes('Failed to fetch')) {
            res.status(500).json({ error: 'Failed to fetch the URL. The target website may be down.' });
        } else {
            res.status(500).json({ error: 'Internal Server Error. Something went wrong on the server.' });
        }
    }
}
