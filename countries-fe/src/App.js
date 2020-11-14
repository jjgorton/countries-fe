import { useEffect, useState } from 'react';

import Map from './components/map/Map';

import { getAll } from './api/actions';
import { distance } from './utils/distance.ts';

import './App.css';

function App() {
    const [allCountries, setAllCountries] = useState({});
    const [selected, setSelected] = useState({});

    useEffect(() => {
        getAll()
            .then((res) => setAllCountries(res.data))
            .catch((err) => console.err(err));
    }, []);

    const closestCountry = (lat, lon) => {
        let closest = { country: {}, dist: Infinity };

        allCountries.forEach((country) => {
            const currDistance = distance(
                lat,
                country.latlng[0],
                lon,
                country.latlng[1]
            );

            if (currDistance < closest.dist)
                closest = { country: country, dist: currDistance };
        });
        setSelected(closest.country);
    };

    return (
        <div className='App'>
            <h1>Countries</h1>
            <p>{selected.name}</p>
            <Map closestCountry={closestCountry} />
        </div>
    );
}

export default App;
