import React from 'react';

import DownloadLink from 'react-download-link';

import './menu.scss';

const Menu = ({ history, setHistory, itinerary, setItinerary }) => {
    const handleUpload = (e) => {
        const uploadedFile = e.target.files[0];

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            try {
                const { history, itinerary } = JSON.parse(fileReader.result);
                setHistory(history);
                setItinerary(itinerary);
            } catch (err) {
                alert(
                    `Opps!  Something went wrong trying to read your file. \n\n ${err}`
                );
            }
        };
        if (uploadedFile !== undefined) fileReader.readAsText(uploadedFile);
    };

    return (
        <div className='menu'>
            <DownloadLink
                className='download'
                label='Save'
                filename='myfile.txt'
                exportFile={() => JSON.stringify({ history, itinerary })}
            />
            <input type='file' onChange={handleUpload} accept='.txt' />
        </div>
    );
};

export default Menu;
