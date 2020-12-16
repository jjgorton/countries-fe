import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';

test('add Details to history via search', async () => {
    render(<App />);

    const search = await screen.findByTestId('search-input');
    const button = await screen.findByTestId('search-button');

    fireEvent.change(search, { target: { value: 'france' } });

    expect(search.value).toBe('france');

    fireEvent.click(button);

    const country = await screen.findByTestId('history-list');

    expect(country).toBeInTheDocument();
});
