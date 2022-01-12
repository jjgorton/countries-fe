import { distanceOnSphere } from './distance';

interface Itinerary {
    countryIndex: number;
    id: string;
}

interface Country {
    latlng: number[];
}

async function buildGraph(allCountries: Country[], itinerary: Itinerary[]) {
    // {countryIndex1: {countryIndex2: distance}, countryIndex2: {countryIndex1: distance}}
    const graph: any = {};

    for (let i = 0; i < itinerary.length; i++) {
        const cur: Itinerary = itinerary[i];
        const curIndex: number = Number(cur.id.split('-')[0]);
        const lat1 = allCountries[curIndex].latlng[0];
        const lon1 = allCountries[curIndex].latlng[1];

        graph[cur.id] = {};

        for (let j = 0; j < itinerary.length; j++) {
            if (j !== i) {
                const next: Itinerary = itinerary[j];
                const nextIndex: number = Number(next.id.split('-')[0]);
                const lat2 = allCountries[nextIndex].latlng[0];
                const lon2 = allCountries[nextIndex].latlng[1];

                graph[cur.id][next.id] = distanceOnSphere(
                    lat1,
                    lat2,
                    lon1,
                    lon2
                );
            }
        }
    }

    return graph;
}

interface Node {
    path: string[];
    distance: number;
    visited: Set<string>;
}

interface Connection {
    [key: string]: number;
}

type Promise = {
    [index: string]: any;
};

async function findShortestPath(
    allCountries: Country[],
    itinerary: Itinerary[]
) {
    const graph: Promise = await buildGraph(allCountries, itinerary);

    let shortestPath: string[] = [];
    let shortestDistance: number = Infinity;

    for (let start of itinerary) {
        const stack: Node[] = [
            { path: [start.id], distance: 0, visited: new Set() },
        ];

        while (stack.length) {
            const cur: Node = stack.pop()!;
            cur.visited.add(cur.path[cur.path.length - 1]);

            if (
                cur.path.length === itinerary.length &&
                cur.distance < shortestDistance
            ) {
                shortestDistance = cur.distance;
                shortestPath = cur.path;
            }

            const connections: Connection =
                graph[cur.path[cur.path.length - 1]];

            for (let i in connections) {
                if (!cur.visited.has(i)) {
                    const copyCur: Node = {
                        path: [...cur.path, i],
                        distance: cur.distance + connections[i],
                        visited: new Set<string>(cur.visited),
                    };

                    stack.push(copyCur);
                }
            }
        }
    }

    return shortestPath.map((stringId) => {
        return { countryIndex: Number(stringId.split('-')[0]), id: stringId };
    });
}

export { buildGraph, findShortestPath };
