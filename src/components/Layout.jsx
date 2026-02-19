import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Search from './Search';
import './Layout.css';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-wrapper">
        <header className="header">
          <button 
            className="menu-button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
          
          <div className="header-title">TechServ Documentation</div>
          
          <button 
            className="search-button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search documentation"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="8" cy="8" r="6"/>
              <path d="M13 13l5 5"/>
            </svg>
            <span className="search-label">Search</span>
            <kbd className="search-shortcut">Ctrl+K</kbd>
          </button>
        </header>
        
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      
      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
