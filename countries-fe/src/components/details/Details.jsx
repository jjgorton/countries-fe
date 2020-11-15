import React from 'react';

import './details.scss';

const Details = ({ country }) => {
    return (
        <div className='details'>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
        </div>
    );
};

export default Details;
