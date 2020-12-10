// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';

import { mockData } from './api/mockData';

// jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
//     GeolocateControl: jest.fn(),
//     Map: jest.fn(() => ({
//         addControl: jest.fn(),
//         on: jest.fn(),
//         remove: jest.fn(),
//     })),
//     NavigationControl: jest.fn(),
// }));

const server = setupServer(
    rest.get('https://restcountries-v1.p.rapidapi.com/all', (req, res, ctx) => {
        return res(ctx.json(mockData));
    })
);

beforeAll(() => {
    server.listen();
    window.alert = jest.fn();
    jest.mock('react-map-gl');
});

afterEach(() => server.resetHandlers());

afterAll(() => {
    server.close();
    jest.clearAllMocks();
});
