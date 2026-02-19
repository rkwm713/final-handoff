import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { navigation } from '../data/navigation';
import './Search.css';

const searchIndex = [];

navigation.forEach((item) => {
  if (item.path) {
    searchIndex.push({
      title: item.title,
      path: item.path,
      type: 'page',
    });
  }
  if (item.children) {
    item.children.forEach((child) => {
      searchIndex.push({
        title: child.title,
        description: child.description,
        path: child.path,
        parent: item.title,
        type: 'page',
      });
    });
  }
});

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'description', weight: 0.2 },
    { name: 'parent', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
});

export default function Search({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      const timeoutId = setTimeout(() => {
        setQuery('');
        setResults([]);
        setSelectedIndex(0);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          document.querySelector('.search-button')?.click();
        }
      }
      
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = useCallback((value) => {
    setQuery(value);
    if (value.trim()) {
      const searchResults = fuse.search(value).slice(0, 8);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, []);

  const handleSelect = useCallback((path) => {
    navigate(path);
    onClose();
    setQuery('');
  }, [navigate, onClose]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex].item.path);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="8" cy="8" r="6"/>
            <path d="M13 13l5 5"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <kbd className="search-esc">ESC</kbd>
        </div>

        {results.length > 0 && (
          <div className="search-results">
            {results.map((result, index) => (
              <button
                key={result.item.path}
                className={`search-result ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSelect(result.item.path)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="result-content">
                  <div className="result-title">{result.item.title}</div>
                  {result.item.parent && (
                    <div className="result-parent">{result.item.parent}</div>
                  )}
                  {result.item.description && (
                    <div className="result-description">{result.item.description}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="search-no-results">
            <p>No results found for "{query}"</p>
            <p className="no-results-hint">Try different keywords</p>
          </div>
        )}

        {!query && (
          <div className="search-hints">
            <p>Quick navigation tips:</p>
            <ul>
              <li><kbd>↑</kbd> <kbd>↓</kbd> to navigate</li>
              <li><kbd>Enter</kbd> to select</li>
              <li><kbd>Esc</kbd> to close</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
