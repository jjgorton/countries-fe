import React from 'react';

import Plot from 'react-plotly.js';

const Map = () => {
    return (
        <div>
            <h2>Maps</h2>

            <Plot
                data={[
                    {
                        type: 'choropleth',
                        locationmode: 'country names',

                        autocolorscale: true,
                    },
                ]}
            />
        </div>
    );
};

export default Map;
