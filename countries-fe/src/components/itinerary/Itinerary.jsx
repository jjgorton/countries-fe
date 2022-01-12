import React, { useState, useEffect } from 'react';
import Details from '../details/Details';
import Spinner from '../spinner/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import { Droppable } from 'react-beautiful-dnd';
import { findShortestPath } from '../../utils/buildGraph';

import './itinerary.scss';

const Itinerary = ({ itinerary, setItinerary, allCountries, setSelected }) => {
    const [showItinerary, setShowItinerary] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    console.log(itinerary);

    useEffect(() => {
        if (showSpinner) {
            findShortestPath(allCountries, itinerary)
                .then((res) => {
                    setItinerary(res);
                    setShowSpinner(false);
                })
                .catch((err) => {
                    alert(`Oops! Something went wrong: \n\n ${err}`);
                    console.error(err);
                });
        }
        return () => null;
    }, [showSpinner]);

    return (
        <div className={`itinerary-container ${!showItinerary && 'hide'}`}>
            <div className='title'>
                <FontAwesomeIcon
                    icon={showItinerary ? faChevronRight : faChevronLeft}
                    className='slide-icon'
                    onClick={() => setShowItinerary(!showItinerary)}
                />
                <h1>Trip Itinerary</h1>
                <button onClick={() => setShowSpinner(true)}>TSP</button>
            </div>
            <Droppable droppableId='itinerary'>
                {(provided) => (
                    <div
                        className='itinerary'
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {(showSpinner && (
                            <Spinner showSpinner={showSpinner} />
                        )) ||
                            (itinerary &&
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
                                }))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Itinerary;
