import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import './details.scss';

const Details = ({ country, index, id }) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    className='details'
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}>
                    <h1>{country.name}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Population: {country.population}</p>
                </div>
            )}
        </Draggable>
    );
};

export default Details;
