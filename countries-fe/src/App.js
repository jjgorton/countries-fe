import { useEffect, useState } from 'react';

import { getAll } from './api/actions';
import { distance } from './utils/distance.ts';

import Map from './components/map/Map';
import SearchBar from './components/search/SearchBar';
import History from './components/history/History';
import Itinerary from './components/itinerary/Itinerary';

import { DragDropContext } from 'react-beautiful-dnd';

import './app.scss';

function App() {
    const [allCountries, setAllCountries] = useState([{}]);
    const [selected, setSelected] = useState([{}]);
    const [history, setHistory] = useState([]);
    const [itinerary, setItinerary] = useState([]);

    useEffect(() => {
        getAll()
            .then((res) => setAllCountries(res.data))
            .catch((err) => console.error(err));
    }, []);

    const addHistory = (countryIndexArr) => {
        const arr = countryIndexArr.map((countryIndex) => {
            const id = `${countryIndex + '-' + new Date().valueOf()}`;

            return { countryIndex, id };
        });
        setHistory([...history, ...arr]);
    };

    const closestCountry = (lat, lon) => {
        let closest = { countryName: '', countryIndex: '', dist: Infinity };

        allCountries.forEach((country, index) => {
            const currDistance = distance(
                lat,
                country.latlng[0],
                lon,
                country.latlng[1]
            );

            if (currDistance < closest.dist)
                closest = {
                    countryName: country.name,
                    countryIndex: index,
                    dist: currDistance,
                };
        });

        addHistory([closest.countryIndex]);
        // setHistory([...history, closest.country]);
        // setItinerary([...itinerary, closest.country]);
    };

    const handleOnDragEnd = (res) => {
        if (!res.destination) return;
        console.log(res);
        const draggedCountryIndex = {
            countryIndex: res.draggableId.split('-')[0] * 1,
            id: res.draggableId,
        };

        const itineraryCopy = [...itinerary];
        const historyCopy = [...history];

        if (res.source.droppableId === 'itinerary') {
            itineraryCopy.splice(res.source.index, 1);
            console.log('if', itineraryCopy);
        } else if (res.source.droppableId === 'history') {
            historyCopy[res.source.index].id += Date.now();
            setHistory(historyCopy);
        }
        itineraryCopy.splice(res.destination.index, 0, draggedCountryIndex);

        console.log(itineraryCopy);

        setItinerary(itineraryCopy);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className='App'>
                <History history={history} allCountries={allCountries} />
                <SearchBar
                    allCountries={allCountries}
                    selected={selected}
                    setSelected={setSelected}
                    history={history}
                    setHistory={setHistory}
                    addHistory={addHistory}
                />
                <Itinerary itinerary={itinerary} allCountries={allCountries} />
                <Map closestCountry={closestCountry} />
            </div>
        </DragDropContext>
    );
}

export default App;
