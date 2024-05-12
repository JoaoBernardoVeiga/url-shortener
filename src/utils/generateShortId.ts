import md5 from 'md5';

// Helper function to generate a random short id
export function generateShortId(link: string): string {
    link = md5(link);
    const shortId = link.substring(0, 8);
    return shortId;
}