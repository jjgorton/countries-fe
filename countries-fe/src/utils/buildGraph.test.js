import { buildGraph, findShortestPath } from './buildGraph';
import { mockData } from '../api/mockData';

const mockItinerary = [
    {
        countryIndex: 0,
        id: '0-1640644521167',
    },
    {
        countryIndex: 1,
        id: '1-1640644554923',
    },
    {
        countryIndex: 4,
        id: '4-1640644635198',
    },
];

test('builds adjacency list', () => {
    const graph = buildGraph(mockData, mockItinerary);

    expect(graph).toHaveProperty('0-1640644521167');
    expect(graph).toHaveProperty('1-1640644554923');
    expect(graph).toHaveProperty('4-1640644635198');
});

test('finds shortest path(s)', () => {
    const shortestPath = findShortestPath(mockData, mockItinerary);

    const pathIndexes = shortestPath.map((item) => item.countryIndex);

    expect(pathIndexes.length).toBe(3);
    expect(pathIndexes[1]).toBe(0);
});
