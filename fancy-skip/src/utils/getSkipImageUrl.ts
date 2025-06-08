// A centralized helper to get the correct image URL for a given skip size.
// This keeps our components clean and makes updating images easy.

const BASE_URL = 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes';

// Mapping of skip sizes from the API to their corresponding image filenames.
const imageUrls: { [key: number]: string } = {
    4: `${BASE_URL}/4-yarder-skip.jpg`,
    6: `${BASE_URL}/6-yarder-skip.jpg`,
    8: `${BASE_URL}/8-yarder-skip.jpg`,
    10: `${BASE_URL}/10-yarder-skip.jpg`,
    12: `${BASE_URL}/12-yarder-skip.jpg`,
    14: `${BASE_URL}/14-yarder-skip.jpg`,
    16: `${BASE_URL}/16-yarder-skip.jpg`,
    20: `${BASE_URL}/20-yarder-skip.jpg`,
    40: `${BASE_URL}/40-yarder-skip.jpg`,
};

// A fallback image in case a size is not in our map.
const fallbackImage = `${BASE_URL}/8-yarder-skip.jpg`;

export function getSkipImageUrl(size: number): string {
    return imageUrls[size] || fallbackImage;
}