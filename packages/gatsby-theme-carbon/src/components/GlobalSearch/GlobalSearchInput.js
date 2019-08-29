// https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html/#ex1
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/role-has-required-aria-props */

import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'gatsby';
import { Close20, Search20 } from '@carbon/icons-react';
import { throttle as _throttle } from 'lodash';
import NavContext from '../../util/context/NavContext';
import { useOnClickOutside } from '../../util/hooks';

import {
  list,
  container,
  input,
  link,
  description,
} from './GlobalSearch.module.scss';

const MAX_RESULT_LIST_SIZE = 8;

const search = _throttle(queryString => {
  if (window.__LUNR__) {
    const lunrIndex = window.__LUNR__.en;
    const searchResults = lunrIndex.index
      .search(`${queryString}*`)
      .slice(0, MAX_RESULT_LIST_SIZE);
    return searchResults.map(({ ref, ...rest }) => lunrIndex.store[ref]);
  }
}, 150);

const GlobalSearchInput = () => {
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { toggleNavState, searchIsOpen } = useContext(NavContext);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  useOnClickOutside(searchRef, () => toggleNavState('searchIsOpen', 'close'));

  useEffect(() => {
    setResults(query ? search(query) : []);
  }, [query]);

  return (
    <div
      ref={searchRef}
      className={`bx--search bx--search--lg bx--search--dark ${container}`}
      role="search"
    >
      <Search20
        description="Search Maginfier"
        className="bx--search-magnifier"
      />
      <label htmlFor="search-input" id="search-label" className="bx--label">
        Search by element, component, or token, etc
      </label>
      <div
        role="combobox"
        aria-expanded={searchIsOpen}
        aria-owns="search-listbox"
        aria-haspopup="listbox"
        id="search-combobox"
      >
        <input
          ref={inputRef}
          type="text"
          aria-autocomplete="list"
          aria-controls="search-listbox"
          ariac-activedescendant
          className={`bx--search-input ${input}`}
          id="search-input"
          placeholder="Search by element, component, or token, etc"
          value={query}
          onChange={evt => setQuery(evt.target.value)}
        />
      </div>
      <button
        className="bx--search-close"
        type="button"
        onClick={() => {
          setQuery('');
          toggleNavState('searchIsOpen', 'close');
        }}
      >
        <Close20 description="Search Clear" className="bx--search-clear" />
      </button>
      <ul
        aria-labelledby="search-label"
        role="listbox"
        id="search-listbox"
        className={list}
      >
        {results.map(page => (
          <li key={page.path}>
            <Link className={link} to={page.path}>
              {`${page.title} – `}
              <span className={description}>
                {page.description.toLowerCase()}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlobalSearchInput;
