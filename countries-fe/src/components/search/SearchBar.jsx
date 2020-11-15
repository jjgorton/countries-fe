import React from 'react';

import './searchBar.scss';

const SearchBar = ({ data }) => {
    console.log(data);

    return (
        <div className='search-bar'>
            <input />
            <button>Search</button>
        </div>
    );
};

export default SearchBar;
