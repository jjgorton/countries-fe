import { useEffect } from 'react';

import Map from './components/map/Map';

import { getAll } from './api/actions';

import './App.css';

function App() {
    // useEffect(() => {
    //     getAll()
    //         .then((data) => console.log(data))
    //         .catch((err) => console.err(err));
    // }, []);

    return (
        <div className='App'>
            <h1>Countries</h1>
            <Map />
        </div>
    );
}

export default App;
