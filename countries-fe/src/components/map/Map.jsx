import React, { useState } from 'react';

import ReactMapGL from 'react-map-gl';
import Plot from 'react-plotly.js';

const Map = ({ closestCountry }) => {
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '90vh',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 1.5,
    });

    return (
        <div>
            <h2>Maps</h2>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle='mapbox://styles/jjgorton/ckhgy8lt90trq19q7hnrgps0e'
                onClick={(e) => closestCountry(e.lngLat[1], e.lngLat[0])}
                onViewportChange={(viewChange) => setViewport(viewChange)}>
                <div></div>
            </ReactMapGL>
        </div>
    );
};

export default Map;
