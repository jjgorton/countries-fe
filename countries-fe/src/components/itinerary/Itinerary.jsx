import React from 'react';
import Details from '../details/Details';

import { Droppable } from 'react-beautiful-dnd';

import './itinerary.scss';

const Itinerary = ({ itinerary }) => {
    return (
        <Droppable droppableId='itinerary'>
            {(provided) => (
                <div
                    className='itinerary'
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {itinerary.map((country, index) => (
                        <Details
                            key={`${Date.now()}`}
                            id={`${Date.now()}`}
                            index={index}
                            country={country}
                        />
                    ))}
                </div>
            )}
        </Droppable>
    );
};

export default Itinerary;
