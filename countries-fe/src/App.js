import { useEffect, useState } from 'react';

import { getAll } from './api/actions';
import { distance } from './utils/distance.ts';

import Map from './components/map/Map';
import SearchBar from './components/search/SearchBar';
import History from './components/history/History';
import Itinerary from './components/itinerary/Itinerary';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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

    const handleOnDragEnd = ({ source, destination, draggableId }) => {
        console.log({ source, destination, draggableId });
        if (!destination)
            // || destination.droppableId !== 'itinerary'
            return;

        const itineraryCopy = [...itinerary];
        const draggedCountryIndex = {
            countryIndex: draggableId.split('-')[0] * 1,
            id: draggableId,
        };

        if (source.droppableId === 'itinerary') {
            itineraryCopy.splice(source.index, 1);

            if (destination.droppableId === 'itinerary') {
                itineraryCopy.splice(destination.index, 0, draggedCountryIndex);
            }

            setItinerary(itineraryCopy);
        } else if (source.droppableId === 'history') {
            const historyCopy = [...history];

            if (destination.droppableId === 'itinerary') {
                //change dragged id in the copy and move to end
                historyCopy[source.index].id += Date.now();
                itineraryCopy.splice(destination.index, 0, draggedCountryIndex);
                setItinerary(itineraryCopy);
                // historyCopy.push(historyCopy.splice(source.index, 1)[0]);
            } else if (destination.droppableId === 'trash') {
                historyCopy.splice(source.index, 1);
            }

            setHistory(historyCopy);
        }
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
                <Droppable droppableId='trash'>
                    {(provided) => (
                        <div
                            className='trash'
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Itinerary itinerary={itinerary} allCountries={allCountries} />
                <Map closestCountry={closestCountry} />
            </div>
        </DragDropContext>
    );
}

export default App;
