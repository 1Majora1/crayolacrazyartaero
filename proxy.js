// api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { url } = req.query;  // Capture the URL passed as query parameter
    if (!url) {
        return res.status(400).json({ error: 'URL is required.' });
    }

    try {
        // Fetch content from the URL
        const response = await fetch(url);
        const contentType = response.headers.get('Content-Type') || 'text/html';

        // Set the correct content-type in the response
        res.setHeader('Content-Type', contentType);

        // Pipe the content from the target URL to the response
        const body = await response.text();
        res.status(200).send(body);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Failed to fetch the URL.' });
    }
}
