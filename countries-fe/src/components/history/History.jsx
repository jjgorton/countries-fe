import React from 'react';

import Details from '../details/Details';

import { Droppable } from 'react-beautiful-dnd';

import './history.scss';

const History = ({ history, allCountries }) => {
    return (
        <Droppable droppableId='history'>
            {(provided) => (
                <div
                    className='history'
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {history.map(({ countryIndex, id }, index) => {
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

export default History;
