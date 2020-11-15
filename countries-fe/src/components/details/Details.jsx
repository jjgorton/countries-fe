import React from 'react';

import './details.scss';

const Details = ({ selected }) => {
    return (
        <div className='details'>
            <h1>{selected.name}</h1>
            <p>Capital: {selected.capital}</p>
            <p>Population: {selected.population}</p>
        </div>
    );
};

export default Details;
