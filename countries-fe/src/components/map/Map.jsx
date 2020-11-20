import React, { useState, useEffect } from 'react';

import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';

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
        const area = index.reduce((a, b) => {
            const sqKM = allCountries[b] ? allCountries[b].area / 1000 : 0;
            return a + sqKM;
        }, 0);

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
            setViewport({
                ...viewport,
                latitude: latLong(selected)[0],
                longitude: latLong(selected)[1],
                zoom: areaZoom(selected),
                transitionDuration: 5000,
                transitionInterpolator: new FlyToInterpolator(),
                transitionEasing: easeCubic,
            });
        } else {
            setViewport({
                ...viewport,
                latitude: latLong(selected)[0],
                longitude: latLong(selected)[1],
                zoom: 1.5,
                transitionDuration: 5000,
                transitionInterpolator: new FlyToInterpolator(),
                transitionEasing: easeCubic,
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
                onViewportChange={(viewChange) => setViewport(viewChange)}>
                {selected.map((countryIndex, index) => (
                    <Marker
                        key={index}
                        latitude={latLong(countryIndex)[0]}
                        longitude={latLong(countryIndex)[1]}>
                        <div
                            className='marker'
                            onClick={() => setSelected([countryIndex])}>
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
