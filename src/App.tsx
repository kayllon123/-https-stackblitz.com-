import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu } from './pages/Menu';
import { AdminPanel } from './pages/AdminPanel';

export function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="bg-gray-800 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-white text-xl font-bold hover:text-orange-500">
              Cardápio
            </Link>
            <Link to="/admin" className="text-white hover:text-orange-500">
              Área Administrativa
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;