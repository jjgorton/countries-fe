import React, { useState } from 'react';

import ReactMapGL, { Marker } from 'react-map-gl';
import Plot from 'react-plotly.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import './map.scss';

const Map = ({ closestCountry, allCountries, itinerary, selected }) => {
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 1.5,
    });

    return (
        <div className='map'>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle='mapbox://styles/jjgorton/ckhgy8lt90trq19q7hnrgps0e'
                onClick={(e) => closestCountry(e.lngLat[1], e.lngLat[0])}
                onViewportChange={(viewChange) => setViewport(viewChange)}>
                {itinerary.map(({ countryIndex, id }, index) => (
                    <Marker
                        key={id}
                        latitude={allCountries[countryIndex].latlng[0]}
                        longitude={allCountries[countryIndex].latlng[1]}>
                        <div className='marker'>
                            {/* <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className='marker'
                            /> */}
                            <div className='order'>{index + 1}</div>
                            <div className='point'></div>
                        </div>
                    </Marker>
                ))}
            </ReactMapGL>
        </div>
    );
};

export default Map;
