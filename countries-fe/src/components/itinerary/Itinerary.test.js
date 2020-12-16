import { render, screen } from '@testing-library/react';

import { DragDropContext } from 'react-beautiful-dnd';
import Itinerary from './Itinerary';

test('renders Itinerary', () => {
    render(
        <DragDropContext>
            <Itinerary />
        </DragDropContext>
    );

    const list = screen.getByText(/itinerary/i);

    expect(list).toBeInTheDocument();
});
