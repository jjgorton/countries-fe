import React from 'react';
import ClockLoader from 'react-spinners/ClockLoader';

import './spinner.scss';

const Spinner = ({ showSpinner }) => {
    return (
        <div className={'spinner-container'}>
            <ClockLoader
                color={'gold'}
                loading={showSpinner}
                size={600}
                speedMultiplier={0.5}
            />
        </div>
    );
};

export default Spinner;
