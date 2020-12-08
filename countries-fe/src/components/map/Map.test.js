import { render, screen } from '@testing-library/react';
import Map from './Map';

// jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
//     Map: () => ({}),
// }));

test('renders map', () => {
    render(<Map />);
    const map = screen.getByTestId('mapbox');
    expect(map).toBeInTheDocument();
});
