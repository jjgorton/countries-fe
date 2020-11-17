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
    };

    const handleOnDragEnd = (res) => {
        if (!res.destination || res.destination.droppableId !== 'itinerary')
            return;

        const draggedCountryIndex = {
            countryIndex: res.draggableId.split('-')[0] * 1,
            id: res.draggableId,
        };

        const itineraryCopy = [...itinerary];

        if (res.source.droppableId === 'itinerary') {
            itineraryCopy.splice(res.source.index, 1);
        } else if (res.source.droppableId === 'history') {
            const historyCopy = [...history];

            //change dragged id in the copy and move to end
            historyCopy[res.source.index].id += Date.now();
            historyCopy.push(historyCopy.splice(res.source.index, 1)[0]);

            setHistory(historyCopy);
        }
        itineraryCopy.splice(res.destination.index, 0, draggedCountryIndex);

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
