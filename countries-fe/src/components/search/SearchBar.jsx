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

    const handleKeys = (e) => {
        console.log(e);
        if (e.key === 'Tab' || e.key === 'ArrowRight') {
            setQuery(suggestion);
        }
        if (e.key === 'Escape') {
            setSuggestion(query);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuggestion(query);
    };

    return (
        <form className='search-bar' onSubmit={handleSubmit}>
            <input
                type='text'
                onChange={handleChanges}
                value={query}
                onKeyDown={handleKeys}
            />
            <div className='auto-complete'>{suggestion}</div>
            <button>Search</button>
        </form>
    );
};

export default SearchBar;
