import React, { useState } from 'react';

import { autoComplete } from '../../utils/autoComplete';

import './searchBar.scss';

const SearchBar = ({ data }) => {
    const [query, setQuery] = useState('');
    const [suggestion, setSuggestion] = useState('');

    const handleChanges = (e) => {
        setQuery(e.target.value);

        setSuggestion(autoComplete(e.target.value, data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuggestion(query);
    };

    return (
        <form className='search-bar' onSubmit={handleSubmit}>
            <input type='text' onChange={handleChanges} value={query} />
            <div className='auto-complete'>{suggestion}</div>
            <button>Search</button>
        </form>
    );
};

export default SearchBar;
