import '@testing-library/jest-dom';
import { distance, distanceOnSphere } from './distance';

const lat1 = 51.5007;
const lat2 = 40.6892;
const lon1 = 0.1246;
const lon2 = 74.0445;

test('find distance between two points on a flat plane', () => {
    const length = distance(lat1, lat2, lon1, lon2);

    expect(length).toBeDefined();
});

test('find distance between two points on a sphere', () => {
    const length = distanceOnSphere(lat1, lat2, lon1, lon2);

    expect(length).toBe(5574.840456848555);
});
