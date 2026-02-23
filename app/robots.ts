import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    // Replace with your actual domain once deployed
    const baseUrl = 'https://bhagyesh.dev';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
