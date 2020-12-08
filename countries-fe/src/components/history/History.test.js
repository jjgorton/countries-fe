import { render, screen } from '@testing-library/react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import History from './History';

test('renders History', () => {
    render(
        <DragDropContext>
            <History />
        </DragDropContext>
    );

    const list = screen.getByText(/history/i);

    expect(list).toBeInTheDocument();
});
