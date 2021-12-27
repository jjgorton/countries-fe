import { buildGraph } from './buildGraph';
import { mockData } from '../api/mockData';

const mockItinerary = [
    {
        countryIndex: 0,
        id: '179-1640644521167',
    },
    {
        countryIndex: 1,
        id: '177-1640644554923',
    },
    {
        countryIndex: 4,
        id: '231-1640644635198',
    },
];

test('builds adjacency list', () => {
    const graph = buildGraph(mockData, mockItinerary);
    console.log(graph);

    expect(graph).toHaveProperty('0');
    expect(graph).toHaveProperty('1');
    expect(graph).toHaveProperty('4');
});
