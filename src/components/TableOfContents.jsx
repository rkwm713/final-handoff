import { useState, useEffect } from 'react';
import './TableOfContents.css';

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="toc">
      <div className="toc-header">On this page</div>
      <ul className="toc-list">
        {headings.map(({ level, text, id }) => (
          <li key={id} className={`toc-item toc-level-${level}`}>
            <a
              href={`#${id}`}
              className={activeId === id ? 'active' : ''}
              onClick={(e) => handleClick(e, id)}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
