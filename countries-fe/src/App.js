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
    const [allCountries, setAllCountries] = useState([{}]);
    const [selected, setSelected] = useState({});
    const [history, setHistory] = useState([]);
    const [itinerary, setItinerary] = useState([]);

    useEffect(() => {
        getAll()
            .then((res) => setAllCountries(res.data))
            .catch((err) => console.error(err));
    }, []);

    function flatten(arr) {
        const allValues = new Set();

        function recurse(val) {
            if (typeof val !== 'object') {
                allValues.add(val);
            } else {
                Object.values(val).forEach((i) => i && recurse(i));
            }
        }

        recurse(arr);

        // arr.forEach((obj) => {
        //     const cur = Object.values(obj).flat(5);

        //     for (let item of cur) {
        //         if (item && typeof item === 'object') {
        //             Object.values(item).forEach((i) => allValues.add(i));
        //         } else {
        //             allValues.add(item);
        //         }
        //     }

        //     // return [...new Set(Object.values(item).flat(5))];
        // });
        return [...allValues];
    }

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
            <SearchBar data={flatten(allCountries)} />
            <Itinerary itinerary={itinerary} />
            <Map closestCountry={closestCountry} />
        </div>
    );
}

export default App;
