import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { docPaths, getPageTitle } from '../data/navigation';
import TableOfContents from './TableOfContents';
import './DocPage.css';

export default function DocPage() {
  const location = useLocation();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);

  const docPath = docPaths[location.pathname] || docPaths['/'];
  const pageTitle = getPageTitle(location.pathname);

  useEffect(() => {
    let cancelled = false;
    const timeoutId = setTimeout(() => {
      setLoading(true);
      setError(null);
    }, 0);

    fetch(docPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Document not found');
        }
        return response.text();
      })
      .then((text) => {
        if (cancelled) return;
        setContent(text);

        const headingRegex = /^(#{2,3})\s+(.+)$/gm;
        const extractedHeadings = [];
        let match;
        while ((match = headingRegex.exec(text)) !== null) {
          const level = match[1].length;
          const headingText = match[2].trim();
          const id = headingText
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          extractedHeadings.push({ level, text: headingText, id });
        }
        setHeadings(extractedHeadings);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [docPath]);

  useEffect(() => {
    document.title = `${pageTitle} | TechServ Docs`;
  }, [pageTitle]);

  useEffect(() => {
    if (location.hash && !loading) {
      const id = location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash, loading]);

  if (loading) {
    return (
      <div className="doc-loading">
        <div className="loading-spinner"></div>
        <p>Loading documentation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doc-error">
        <h2>Document Not Found</h2>
        <p>Sorry, we couldn't find the requested documentation.</p>
        <p className="error-detail">{error}</p>
      </div>
    );
  }

  return (
    <div className="doc-page">
      <article className="doc-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
          components={{
            h1: ({ children, ...props }) => (
              <h1 {...props}>
                {children}
                <a href={`#${props.id}`} className="heading-anchor" aria-hidden="true">#</a>
              </h1>
            ),
            h2: ({ children, ...props }) => (
              <h2 {...props}>
                {children}
                <a href={`#${props.id}`} className="heading-anchor" aria-hidden="true">#</a>
              </h2>
            ),
            h3: ({ children, ...props }) => (
              <h3 {...props}>
                {children}
                <a href={`#${props.id}`} className="heading-anchor" aria-hidden="true">#</a>
              </h3>
            ),
            table: ({ children, ...props }) => (
              <div className="table-wrapper">
                <table {...props}>{children}</table>
              </div>
            ),
            pre: ({ children }) => {
              return <pre className="code-block">{children}</pre>;
            },
            code: ({ className, children }) => {
              // Code blocks have a language className or are multiline
              const isCodeBlock = className || String(children).includes('\n');
              
              if (isCodeBlock) {
                return <code className={className}>{children}</code>;
              }
              
              // Inline code
              return <code className="inline-code">{children}</code>;
            },
            a: ({ href, children, ...props }) => {
              const isExternal = href && (href.startsWith('http') || href.startsWith('//'));
              const isDownload = href && href.startsWith('/context/');
              if (isExternal) {
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                    {children}
                  </a>
                );
              }
              if (isDownload) {
                return (
                  <a href={href} download {...props}>
                    {children}
                  </a>
                );
              }
              return <a href={href} {...props}>{children}</a>;
            },
            blockquote: ({ children, ...props }) => (
              <blockquote className="callout" {...props}>{children}</blockquote>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
      
      {headings.length > 0 && (
        <TableOfContents headings={headings} />
      )}
    </div>
  );
}
