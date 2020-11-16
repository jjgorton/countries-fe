import React from 'react';

import Details from '../details/Details';

import './history.scss';

const History = ({ history }) => {
    return (
        <div className='history'>
            {history.map((country, index) => (
                <Details key={index} country={country} />
            ))}
        </div>
    );
};

export default History;
