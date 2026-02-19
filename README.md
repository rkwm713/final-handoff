# TechServ Documentation Wiki

A React-based documentation wiki for the TechServ SharePoint trackers. This app renders markdown documentation with search, navigation, and a professional interface.

**Repo:** [github.com/rkwm713/final-handoff](https://github.com/rkwm713/final-handoff) · **Deploy:** Netlify

## Features

- Sidebar navigation with expandable sections
- Full-text search with keyboard shortcuts (Ctrl+K)
- Responsive design (mobile-friendly)
- GitHub-flavored markdown rendering
- Table of contents for each page
- Deep linking to headings

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at http://localhost:3000

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel auto-detects Vite and configures the build
4. Deploy!

Or deploy directly from command line:

```bash
npx vercel
```

### Netlify

1. Push to GitHub and connect in Netlify dashboard
2. Or drag-and-drop the `dist/` folder after running `npm run build`

Build settings:
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages

1. Add to `vite.config.js`:
   ```js
   base: '/your-repo-name/'
   ```

2. Build and deploy:
   ```bash
   npm run build
   git add dist -f
   git commit -m "Deploy"
   git subtree push --prefix dist origin gh-pages
   ```

### Static File Server

After building, the `dist/` folder contains all static files. Deploy to any web server (IIS, Apache, nginx).

For IIS, add a `web.config` for client-side routing:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="SPA" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

## Updating Documentation

Documentation files are in `public/docs/`:

```
public/docs/
├── index.md              # Home page
├── closing/
│   ├── guide.md          # Closing Tracker User Guide
│   └── automation.md     # Closing Tracker Automation Guide
├── drafting/
│   ├── guide.md          # Drafting Tracker User Guide
│   └── automation.md     # Drafting Tracker Automation Guide
├── ev/
│   ├── guide.md          # EV Tracker User Guide
│   └── automation.md     # EV Tracker Automation Guide
└── small-cell/
    ├── guide.md          # Small Cell Tracker User Guide
    └── automation.md     # Small Cell Tracker Automation Guide
```

To update content, edit the markdown files directly. Changes will reflect after rebuilding.

### Adding New Pages

1. Add the markdown file to `public/docs/`
2. Update `src/data/navigation.js` to add the page to the sidebar
3. Add a route in `src/App.jsx`

## Project Structure

```
wiki-app/
├── public/
│   └── docs/           # Markdown documentation files
├── src/
│   ├── components/     # React components
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── DocPage.jsx
│   │   ├── Search.jsx
│   │   └── TableOfContents.jsx
│   ├── data/
│   │   └── navigation.js  # Menu configuration
│   ├── styles/
│   │   └── global.css     # CSS variables and base styles
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Customization

### Colors

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --primary-color: #0066cc;    /* TechServ blue */
  --primary-dark: #0052a3;
  --primary-light: #e6f0fa;
  /* ... */
}
```

### Logo

Replace the logo in `src/components/Sidebar.jsx`:

```jsx
<div className="logo">
  <img src="/your-logo.png" alt="Logo" />
  <span className="logo-text">Your Company</span>
</div>
```

## Technologies

- [Vite](https://vitejs.dev/) - Build tool
- [React](https://react.dev/) - UI framework
- [React Router](https://reactrouter.com/) - Client-side routing
- [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [Fuse.js](https://fusejs.io/) - Fuzzy search

## License

Internal use only - TechServ Ltd.
