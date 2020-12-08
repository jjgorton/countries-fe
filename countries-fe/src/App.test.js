import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { mockData } from './api/mockData';

import App from './App';

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

test('add item to history', async () => {
    render(<App />);

    // const map = screen.getByTestId('mapbox').firstChild.firstChild.firstChild
    //     .firstChild;
    // console.log(map);
    // fireEvent.click(map);

    const search = await screen.findByTestId('search-input');
    const button = await screen.findByTestId('search-button');

    fireEvent.change(search, { target: { value: 'france' } });

    expect(search.value).toBe('france');

    fireEvent.click(button);

    const country = await screen.findByTestId('history-list');

    expect(country).toBeInTheDocument();
});
