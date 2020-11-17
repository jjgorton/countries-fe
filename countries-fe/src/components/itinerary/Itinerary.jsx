import React from 'react';
import Details from '../details/Details';

import { Droppable } from 'react-beautiful-dnd';

import './itinerary.scss';

const Itinerary = ({ itinerary, allCountries }) => {
    return (
        <Droppable droppableId='itinerary'>
            {(provided) => (
                <div
                    className='itinerary'
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {itinerary.map(({ countryIndex, id }, index) => {
                        return (
                            <Details
                                key={id}
                                id={id}
                                index={index}
                                country={allCountries[countryIndex]}
                            />
                        );
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Itinerary;
