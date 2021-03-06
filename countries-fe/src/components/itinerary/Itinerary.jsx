import React, { useState } from 'react';
import Details from '../details/Details';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import { Droppable } from 'react-beautiful-dnd';

import './itinerary.scss';

const Itinerary = ({ itinerary, allCountries, setSelected }) => {
    const [showItinerary, setShowItinerary] = useState(false);

    return (
        <div className={`itinerary-container ${!showItinerary && 'hide'}`}>
            <div className='title'>
                <FontAwesomeIcon
                    icon={showItinerary ? faChevronRight : faChevronLeft}
                    className='slide-icon'
                    onClick={() => setShowItinerary(!showItinerary)}
                />
                <h1>Trip Itinerary</h1>
            </div>
            <Droppable droppableId='itinerary'>
                {(provided) => (
                    <div
                        className='itinerary'
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {itinerary &&
                            itinerary.map(({ countryIndex, id }, index) => {
                                return (
                                    <Details
                                        key={id}
                                        id={id}
                                        index={index}
                                        country={allCountries[countryIndex]}
                                        setSelected={setSelected}
                                        countryIndex={countryIndex}
                                        list='itinerary-list'
                                    />
                                );
                            })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Itinerary;
