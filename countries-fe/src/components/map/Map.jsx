import React, { useState, useEffect } from 'react';

import ReactMapGL, { Marker } from 'react-map-gl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';

import './map.scss';

const Map = ({
    closestCountry,
    allCountries,
    itinerary,
    selected,
    setSelected,
}) => {
    const latLong = (index) => {
        const location = allCountries[index] ? allCountries[index].latlng : [];
        return location.length === 2 ? location : [0, 0];
    };

    const areaZoom = (index) => {
        const area = allCountries[index] ? allCountries[index].area / 1000 : 0;

        let zoom = 1.5;

        if (10000 < area && area < 18000) zoom = 2;
        else if (9000 < area && area < 9999) zoom = 2.8;
        else if (5000 < area && area < 8999) zoom = 3.3;
        else if (1000 < area && area < 4999) zoom = 4;
        else if (40 < area && area < 999) zoom = 5;
        else if (area < 39) zoom = 7;

        return zoom;
    };

    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 1.5,
    });

    useEffect(() => {
        if (selected.length === 1) {
            areaZoom(selected);
            setViewport({
                ...viewport,
                latitude: latLong(selected)[0],
                longitude: latLong(selected)[1],
                zoom: areaZoom(selected),
            });
        }
    }, [selected]);

    // console.log(selected);

    return (
        <div className='map'>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle='mapbox://styles/jjgorton/ckhgy8lt90trq19q7hnrgps0e'
                onClick={(e) => closestCountry(e.lngLat[1], e.lngLat[0])}
                onViewportChange={(viewChange) => {
                    console.log(viewport);
                    setViewport(viewChange);
                }}>
                {selected.map((countryIndex, index) => (
                    <Marker
                        key={index}
                        latitude={latLong(countryIndex)[0]}
                        longitude={latLong(countryIndex)[1]}>
                        <div
                            className='marker'
                            onClick={() => setSelected([countryIndex])}>
                            {/* <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className='marker'
                            /> */}
                            <div className='order'>
                                <FontAwesomeIcon icon={faSearchPlus} />
                            </div>
                            <div className='point'></div>
                        </div>
                    </Marker>
                ))}
                {itinerary.map(({ countryIndex, id }, index) => (
                    <Marker
                        key={id}
                        latitude={latLong(countryIndex)[0]}
                        longitude={latLong(countryIndex)[1]}>
                        <div
                            className='marker'
                            onClick={() => setSelected([countryIndex])}>
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
