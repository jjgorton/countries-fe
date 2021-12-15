import '@testing-library/jest-dom';
import { distance, distanceOnSphere } from './distance';

test('find distance between two points on a flat plane', () => {
    const lat1 = 51;
    const lat2 = 48;
    const lon1 = 0;
    const lon2 = 2.5;

    const length = distance(lat1, lat2, lon1, lon2);

    console.log(length);
    expect(length).toBeDefined();
});

test('find distance between two points on a sphere', () => {
    const lat1 = 51;
    const lat2 = 48;
    const lon1 = 0;
    const lon2 = 2.5;

    const length = distanceOnSphere(lat1, lat2, lon1, lon2);

    console.log(length);
    expect(length).toBeDefined();
});
