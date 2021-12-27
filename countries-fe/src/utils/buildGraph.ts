import { distanceOnSphere } from './distance';

interface Itinerary {
    countryIndex: number;
    id: string;
}

interface Country {
    latlng: number[];
}

function buildGraph(allCountries: Country[], itinerary: Itinerary[]) {
    // {countryIndex1: {countryIndex2: distance}, countryIndex2: {countryIndex1: distance}}
    const graph: any = {};

    for (let i = 0; i < itinerary.length; i++) {
        const cur: number | string = itinerary[i].countryIndex;
        const lat1 = allCountries[cur].latlng[0];
        const lon1 = allCountries[cur].latlng[1];

        graph[cur] = {};

        for (let j = 0; j < itinerary.length; j++) {
            if (j !== i) {
                const next = itinerary[j].countryIndex;
                const lat2 = allCountries[next].latlng[0];
                const lon2 = allCountries[next].latlng[1];

                graph[cur][next] = distanceOnSphere(lat1, lat2, lon1, lon2);
            }
        }
    }

    return graph;
}

// //return new itinerary array of objects (sorted)
// return [];
export { buildGraph };
