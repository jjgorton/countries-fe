import React from 'react';
import Details from '../details/Details';

import './itinerary.scss';

const Itinerary = ({ itinerary }) => {
    return (
        <div className='itinerary'>
            {itinerary.map((country) => (
                <Details country={country} />
            ))}
        </div>
    );
};

export default Itinerary;
