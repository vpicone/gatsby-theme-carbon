/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Close20, Search20 } from '@carbon/icons-react';
import NavContext from '../../util/context/NavContext';
import { useOnClickOutside } from '../../util/hooks';
import useSearch from '../../util/hooks/useSearch';

const GlobalSearchInput = () => {
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { toggleNavState } = useContext(NavContext);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  useOnClickOutside(searchRef, () => toggleNavState('searchIsOpen', 'close'));

  useEffect(() => {
    if (query && window.__LUNR__) {
      const lunrIndex = window.__LUNR__.en;
      const searchResults = lunrIndex.index.search(`${query}*`);
      setResults(
        searchResults.map(({ ref }) => console.log(ref) || lunrIndex.store[ref])
      );
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div
      ref={searchRef}
      className="bx--search bx--search--lg bx--search--dark"
      role="search"
    >
      <Search20
        description="Search Maginfier"
        className="bx--search-magnifier"
      />
      <label htmlFor="doc-search" className="bx--label">
        Search by element, component, or token, etc
      </label>
      <input
        ref={inputRef}
        aria-label="Search"
        type="text"
        className="bx--search-input"
        id="doc-search"
        placeholder="Search by element, component, or token, etc"
        value={query}
        onChange={evt => setQuery(evt.target.value)}
      />
      <ul>
        {results.map(page => (
          <li key={page.path}>
            <a href={page.path}>{page.title}</a>
          </li>
        ))}
      </ul>
      <button
        className="bx--search-close"
        title="Clear search input"
        type="button"
        aria-label="Clear search input"
        onClick={() => {
          setQuery('');
          toggleNavState('searchIsOpen', 'close');
        }}
      >
        <Close20 description="Search Clear" className="bx--search-clear" />
      </button>
    </div>
  );
};

export default GlobalSearchInput;
