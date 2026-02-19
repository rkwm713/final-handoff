import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DocPage from './components/DocPage';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DocPage />} />
          {/* Closing Tracker */}
          <Route path="closing/guide" element={<DocPage />} />
          <Route path="closing/automation" element={<DocPage />} />
          <Route path="closing/excel-info" element={<DocPage />} />
          <Route path="closing/ai-prompts" element={<DocPage />} />
          {/* Drafting Tracker */}
          <Route path="drafting/overview" element={<DocPage />} />
          <Route path="drafting/guide" element={<DocPage />} />
          <Route path="drafting/automation" element={<DocPage />} />
          <Route path="drafting/excel-info" element={<DocPage />} />
          <Route path="drafting/ai-prompts" element={<DocPage />} />
          {/* EV Tracker */}
          <Route path="ev/overview" element={<DocPage />} />
          <Route path="ev/guide" element={<DocPage />} />
          <Route path="ev/automation" element={<DocPage />} />
          <Route path="ev/excel-info" element={<DocPage />} />
          <Route path="ev/ai-prompts" element={<DocPage />} />
          {/* Small Cell Tracker */}
          <Route path="small-cell/overview" element={<DocPage />} />
          <Route path="small-cell/guide" element={<DocPage />} />
          <Route path="small-cell/automation" element={<DocPage />} />
          <Route path="small-cell/excel-info" element={<DocPage />} />
          <Route path="small-cell/ai-prompts" element={<DocPage />} />
          {/* Catch-all */}
          <Route path="*" element={<DocPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
