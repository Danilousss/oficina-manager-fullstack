import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DemoAlert from './components/DemoAlert';
import Fichas from './pages/Fichas';
import Financeiro from './pages/Financeiro';
import './App.css'; 

export default function App() {
  return (
    <>
    <DemoAlert/>
    <BrowserRouter>
      <Routes>
        <Route path="/" 
        element={<Fichas />} />
        <Route path="/financeiro" 
        element={<Financeiro />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}