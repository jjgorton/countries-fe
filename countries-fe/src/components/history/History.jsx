import React from 'react';

import Details from '../details/Details';

import { Droppable } from 'react-beautiful-dnd';

import './history.scss';

const History = ({ history }) => {
    return (
        <Droppable droppableId='history'>
            {(provided) => (
                <div
                    className='history'
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {history.map((country, index) => (
                        <Details
                            key={`${country + index + Date.now()}`}
                            id={`${Date.now()}`}
                            index={index}
                            country={country}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default History;
