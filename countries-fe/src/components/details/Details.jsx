import React, { useState } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import './details.scss';

const Details = ({ country, index, id }) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    className='details-container'
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}>
                    <div className={`details ${showInfo && 'info'}`}>
                        {!showInfo && <h1>{country.name}</h1>}
                        {showInfo && (
                            <div>
                                <p>Capital: {country.capital}</p>
                                <p>Population: {country.population}</p>
                            </div>
                        )}
                    </div>
                    <FontAwesomeIcon
                        icon={faSyncAlt}
                        className='flip-icon'
                        onClick={() => setShowInfo(!showInfo)}
                    />
                </div>
            )}
        </Draggable>
    );
};

export default Details;
