import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    // Replace with your actual domain once deployed
    const baseUrl = 'https://bhagyesh.dev';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/chat`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];
}
