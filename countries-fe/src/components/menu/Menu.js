import React, { useState } from 'react';

import DownloadLink from 'react-download-link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    faChevronLeft,
    faUpload,
    faDownload,
} from '@fortawesome/free-solid-svg-icons';

import './menu.scss';

const Menu = ({ history, setHistory, itinerary, setItinerary }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [hover, setHover] = useState(false);

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
        <div className={`menu-container ${showMenu && 'hide-menu'}`}>
            <div className='title'>
                <h1>Menu</h1>
                <FontAwesomeIcon
                    icon={showMenu ? faChevronRight : faChevronLeft}
                    className='slide-icon'
                    onClick={() => setShowMenu(!showMenu)}
                />
            </div>
            <div className='menu'>
                <div
                    className='download-container'
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}>
                    <DownloadLink
                        className='link'
                        label=''
                        filename='myfile.txt'
                        exportFile={() =>
                            JSON.stringify({ history, itinerary })
                        }
                    />
                    <div className={`download ${hover && 'fakeHover'}`}>
                        <FontAwesomeIcon
                            icon={faDownload}
                            className='load-icon'
                        />
                    </div>
                </div>
                <form className='upload'>
                    <FontAwesomeIcon icon={faUpload} className='load-icon' />
                    <input type='file' onInput={handleUpload} accept='.txt' />
                    <button>Load</button>
                </form>
            </div>
        </div>
    );
};

export default Menu;
