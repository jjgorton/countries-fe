import { useEffect, useState } from 'react';

import { getAll } from './api/actions';
import { distance } from './utils/distance.ts';

import Map from './components/map/Map';
import Details from './components/details/Details';
import SearchBar from './components/search/SearchBar';
import History from './components/history/History';
import Itinerary from './components/itinerary/Itinerary';

import './app.scss';

function App() {
    const [allCountries, setAllCountries] = useState({});
    const [selected, setSelected] = useState({});
    const [history, setHistory] = useState([]);
    const [itinerary, setItinerary] = useState([]);

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
        setHistory([...history, closest.country]);
        setItinerary([...itinerary, closest.country]);
    };

    return (
        <div className='App'>
            <History history={history} />
            <SearchBar />
            <Itinerary itinerary={itinerary} />
            <Map closestCountry={closestCountry} />
        </div>
    );
}

export default App;
