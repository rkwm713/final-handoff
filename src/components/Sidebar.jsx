import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navigation } from '../data/navigation';
import './Sidebar.css';

function NavItem({ item, isOpen, onToggle }) {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  
  const isActive = hasChildren 
    ? item.children.some(child => location.pathname === child.path)
    : location.pathname === item.path;

  if (hasChildren) {
    return (
      <div className={`nav-group ${isActive ? 'active' : ''}`}>
        <button 
          className="nav-group-header"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span className="nav-title">{item.title}</span>
          <span className={`nav-chevron ${isOpen ? 'open' : ''}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </span>
        </button>
        {isOpen && (
          <div className="nav-children">
            {item.children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) => `nav-child ${isActive ? 'active' : ''}`}
              >
                {child.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
    >
      <span className="nav-title">{item.title}</span>
    </NavLink>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [openSections, setOpenSections] = useState(() => {
    const initial = {};
    navigation.forEach((item, index) => {
      if (item.children) {
        const isActive = item.children.some(child => location.pathname === child.path);
        initial[index] = isActive;
      }
    });
    return initial;
  });

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </span>
            <span className="logo-text">TechServ</span>
          </div>
          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
            </svg>
          </button>
        </div>
        <nav className="sidebar-nav">
          {navigation.map((item, index) => (
            <NavItem
              key={item.title}
              item={item}
              isOpen={openSections[index]}
              onToggle={() => toggleSection(index)}
            />
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>TechServ Engineering Consulting</p>
          <p className="version">SharePoint Documentation</p>
        </div>
      </aside>
    </>
  );
}
