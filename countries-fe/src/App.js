import { useEffect, useState } from 'react';

import { getAll } from './api/actions';
import { distance, distanceOnSphere } from './utils/distance.ts';

import Map from './components/map/Map';
import SearchBar from './components/search/SearchBar';
import History from './components/history/History';
import Itinerary from './components/itinerary/Itinerary';
import Menu from './components/menu/Menu';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import './app.scss';

function App() {
    const [allCountries, setAllCountries] = useState([{}]);
    const [selected, setSelected] = useState([]);
    const [history, setHistory] = useState([]);
    const [itinerary, setItinerary] = useState([]);

    useEffect(() => {
        getAll()
            .then((res) => setAllCountries(res.data))
            .catch((err) => {
                alert(`Oops! Something went wrong: \n\n ${err}`);
                console.error(err);
            });

        return () => null; //testing library wants a clean-up
    }, []);

    const addHistory = (countryIndexArr) => {
        const arr = countryIndexArr.map((countryIndex) => {
            const id = `${countryIndex + '-' + new Date().valueOf()}`;

            return { countryIndex, id };
        });
        setHistory([...history, ...arr]);
    };

    const closestCountry = (lat, lon) => {
        console.log('lat: ', lat, '\nlon: ', lon);
        let closest = { countryName: '', countryIndex: '', dist: Infinity };

        allCountries.forEach((country, index) => {
            const currDistance = distance(
                lat,
                country.latlng[0],
                lon,
                country.latlng[1]
            );

            if (currDistance < closest.dist) {
                closest = {
                    countryName: country.name.common,
                    countryIndex: index,
                    dist: currDistance,
                };
            }
        });

        setSelected([closest.countryIndex]);
        addHistory([closest.countryIndex]);
    };

    const handleOnDragEnd = ({ source, destination, draggableId }) => {
        if (!destination) return;

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
            } else if (destination.droppableId === 'trash') {
                historyCopy.splice(source.index, 1);
            }

            setHistory(historyCopy);
        }
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className='App'>
                <Menu
                    history={history}
                    setHistory={setHistory}
                    itinerary={itinerary}
                    setItinerary={setItinerary}
                />
                <History
                    history={history}
                    allCountries={allCountries}
                    setSelected={setSelected}
                />
                <SearchBar
                    allCountries={allCountries}
                    setSelected={setSelected}
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
                <Itinerary
                    itinerary={itinerary}
                    allCountries={allCountries}
                    setSelected={setSelected}
                />
                <Map
                    closestCountry={closestCountry}
                    allCountries={allCountries}
                    itinerary={itinerary}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </DragDropContext>
    );
}

export default App;
