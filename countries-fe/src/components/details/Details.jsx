import React, { useState } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import languages from '../../assets/languages.json';
import currency from '../../assets/currencies.json';

import './details.scss';

const Details = ({ country, index, id, setSelected, countryIndex, list }) => {
    const [showInfo, setShowInfo] = useState(false);

    const langList = (arr) => {
        return arr.map((code) => languages[code]).join(', ');
    };

    const money = (data) => {
        const options = { style: 'currency', currency: data.currencies[0] };
        let hack = 1;
        const symb = hack.toLocaleString(data.alpha2Code, options);

        return currency[data.currencies[0]] + ` (${symb})`;
    };

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    data-testid={list}
                    className='details-container'
                    onClick={() => setSelected([countryIndex])}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}>
                    <div className={`details ${showInfo && 'info-container'}`}>
                        {!showInfo && <h1>{country.name}</h1>}
                        {showInfo && (
                            <div className='info'>
                                <p>Currency: {money(country)}</p>
                                <p>Language: {langList(country.languages)}</p>
                                <p>People are called "{country.demonym}"</p>
                                <p>
                                    Population:{' '}
                                    {Number(
                                        country.population
                                    ).toLocaleString()}
                                </p>
                                <p>Capital: {country.capital}</p>
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
