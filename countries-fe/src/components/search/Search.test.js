import { render, screen, fireEvent, getByText } from '@testing-library/react';

import SearchBar from './SearchBar';
import { mockData } from '../../api/mockData';

test('renders searchBar', () => {
    render(<SearchBar />);
    const search = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    expect(search).toBeInTheDocument();
    expect(button).toBeInTheDocument();
});

test('takes input', () => {
    render(<SearchBar />);
    const search = screen.getByTestId('search-input');

    fireEvent.change(search, { target: { value: 'fran' } });

    expect(search.value).toBe('fran');
});

test('autoCompletes', async () => {
    const { getByTestId, findByText } = render(
        <SearchBar allCountries={mockData} />
    );

    const search = getByTestId('search-input');

    fireEvent.change(search, { target: { value: 'fran' } });

    const autoComplete = await findByText(/france/i);

    expect(autoComplete).toBeInTheDocument();
});
