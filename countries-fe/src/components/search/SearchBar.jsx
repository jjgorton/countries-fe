import React, { useState, useEffect } from 'react';

import { autoComplete, swapKeyVal } from '../../utils';

import './searchBar.scss';

const SearchBar = ({
    allCountries,
    selected,
    setSelected,
    history,
    setHistory,
}) => {
    const [query, setQuery] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [keyWords, setKeyWords] = useState([]);

    useEffect(() => {
        //prevent running on rerenders
        //if perfomance still suffers, consider useCallback
        setKeyWords(Object.keys(swapKeyVal(allCountries)));
    }, []);

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

        const countryIndexSet = swapKeyVal(allCountries)[query];

        if (!countryIndexSet) {
            alert(
                `hmm... we can't seem to find anything that matches "${query}"`
            );

            return;
        }

        const list = [];
        countryIndexSet.forEach((i) => {
            console.log(allCountries[i]);
            list.push(allCountries[i]);
        });

        setSelected([...list]);
        setHistory([...history, ...list]);
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
