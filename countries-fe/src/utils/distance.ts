export const distance = (
    lat1: number,
    lat2: number,
    lon1: number,
    lon2: number
) => {
    return Math.sqrt((lat2 - lat1) ** 2 + (lon2 - lon1) ** 2);
};

// https://www.geeksforgeeks.org/program-distance-two-points-earth/
