import React, { useState } from 'react';

import Details from '../details/Details';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import { Droppable } from 'react-beautiful-dnd';

import './history.scss';

const History = ({ history, allCountries, setSelected }) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div className={`history-container ${!showHistory && 'hide-history'}`}>
            <div className='title'>
                <h1>Search History</h1>
                <FontAwesomeIcon
                    icon={showHistory ? faChevronLeft : faChevronRight}
                    className='slide-icon'
                    onClick={() => setShowHistory(!showHistory)}
                />
            </div>
            <Droppable droppableId='history' isDropDisabled={true}>
                {(provided) => (
                    <div
                        className='history'
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {history &&
                            history.map(({ countryIndex, id }, index) => {
                                return (
                                    <Details
                                        key={id}
                                        id={id}
                                        index={index}
                                        country={allCountries[countryIndex]}
                                        setSelected={setSelected}
                                        countryIndex={countryIndex}
                                        list='history-list'
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

export default History;
