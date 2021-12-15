export const distance = (
    lat1: number,
    lat2: number,
    lon1: number,
    lon2: number
) => {
    return Math.sqrt((lat2 - lat1) ** 2 + (lon2 - lon1) ** 2);
};

// https://www.geeksforgeeks.org/program-distance-two-points-earth/

export const distanceOnSphere = (
    lat1: number,
    lat2: number,
    lon1: number,
    lon2: number
) => {
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;

    const latDistance = lat2Rad - lat1Rad;
    const lonDistance = lon2Rad - lon1Rad;

    // Great Circle Distance Formula
    //https://en.wikipedia.org/wiki/Great-circle_distance

    const GCDpartA =
        Math.sin(latDistance / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) +
        Math.sin(lonDistance / 2) ** 2;

    const GDCpartB = 2 * Math.asin(Math.sqrt(GCDpartA));

    return GDCpartB * 6371;
};
