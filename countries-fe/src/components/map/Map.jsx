import React, { useState } from 'react';

import ReactMapGL from 'react-map-gl';
import Plot from 'react-plotly.js';

const Map = () => {
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    });

    return (
        <div>
            <h2
                onClick={(e) => {
                    console.log('clicked');
                }}>
                Maps
            </h2>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={(viewport) => {
                    setViewport({ viewport });
                }}>
                <div></div>
            </ReactMapGL>
        </div>
    );
};

export default Map;
