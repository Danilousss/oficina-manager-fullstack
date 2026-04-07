import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Fichas from './pages/Fichas';
import Financeiro from './pages/Financeiro';
import './App.css'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
        element={<Fichas />} />
        
        <Route path="/financeiro" 
        element={<Financeiro />} />
      </Routes>
    </BrowserRouter>
  );
}