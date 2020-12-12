import React, { useState, useEffect } from 'react';

import { autoComplete, swapKeyVal } from '../../utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';

import './searchBar.scss';

const SearchBar = ({ allCountries, setSelected, addHistory }) => {
    const [query, setQuery] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [keyWords, setKeyWords] = useState([]);

    useEffect(() => {
        //prevent running on rerenders
        //if perfomance still suffers, consider useCallback
        allCountries && setKeyWords(Object.keys(swapKeyVal(allCountries)));
    }, [allCountries]);

    const handleChanges = (e) => {
        setQuery(e.target.value);
        setSuggestion(autoComplete(e.target.value, keyWords));
    };

    const handleKeys = (e) => {
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
        setSuggestion('');
        setQuery('');

        const countryIndexSet = swapKeyVal(allCountries)[query.toLowerCase()];

        if (!countryIndexSet) {
            alert(
                `hmm... we can't seem to find anything that matches "${query}"`
            );

            return;
        }

        setSelected([...countryIndexSet]);
        addHistory([...countryIndexSet]);
    };

    return (
        <form className='search-bar' onSubmit={handleSubmit}>
            <input
                type='text'
                onChange={handleChanges}
                value={query}
                onKeyDown={handleKeys}
                data-testid='search-input'
            />
            <div className='auto-complete'>{suggestion}</div>
            <button data-testid='search-button'>
                <FontAwesomeIcon icon={faSearchLocation} />
            </button>
        </form>
    );
};

export default SearchBar;
