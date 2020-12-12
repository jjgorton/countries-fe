import { render, screen } from '@testing-library/react';

import SearchBar from './SearchBar';

test('renders searchBar', () => {
    render(<SearchBar />);

    const search = screen.getByTestId('search-input');

    expect(search).toBeInTheDocument();
});
