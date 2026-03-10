import { Link } from 'react-router-dom';

// É ESSA LINHA ABAIXO QUE RESOLVE O ERRO DO CONSOLE
export default function Financeiro() {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Painel Financeiro</h1>
        <Link to="/" className="btn btn-secondary">Voltar para Fichas</Link>
      </div>
      
    </div>
  );
}