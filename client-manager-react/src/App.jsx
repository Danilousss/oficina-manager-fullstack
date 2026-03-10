import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Fichas from './pages/Fichas';
import Financeiro from './pages/Financeiro';
import './App.css'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota da tela principal de fichas */}
        <Route path="/" 
        element={<Fichas />} />
        
        {/* Rota da tela da sua mãe */}
        <Route path="/financeiro" 
        element={<Financeiro />} />
      </Routes>
    </BrowserRouter>
  );
}