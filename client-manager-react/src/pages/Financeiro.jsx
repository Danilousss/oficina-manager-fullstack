import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gastoService } from '../services/gastoService';
import { clientService } from '../services/api';
import FinanceiroCards from '../components/FinanceiroCards';
import FinanceiroForm from '../components/FinanceiroForm';
import FinanceiroTable from '../components/FinanceiroTable';

export default function Financeiro() {
  const [gastos, setGastos] = useState([]);
  const [fichas, setFichas] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  
  const [novoGasto, setNovoGasto] = useState({
    descricao: "", valor: "", data: new Date().toISOString().split('T')[0],
    categoria: "OUTROS", fornecedor: "", pago: false
  });

  const carregarDados = () => {
    gastoService.getAll().then(res => setGastos(res.data)).catch(() => setGastos([
       { id: 1, descricao: 'Compra de estoque', valor: 1200, data: '2026-04-01', categoria: 'PECAS', pago: true },
       { id: 2, descricao: 'Energia Elétrica', valor: 340, data: '2026-04-05', categoria: 'CONTAS', pago: false }
    ]));

    clientService.getAll().then(res => setFichas(res.data)).catch(() => setFichas([
       { price: 1850.00 }, { price: 450.00 }, { price: 80.00 }, { price: 320.00 }
    ]));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const faturamentoBruto = fichas.reduce((acc, f) => acc + (f.price || 0), 0);
  const despesasTotais = gastos.reduce((acc, g) => acc + (g.valor || 0), 0);
  const despesasPagas = gastos.filter(g => g.pago).reduce((acc, g) => acc + g.valor, 0);
  const despesasPendentes = despesasTotais - despesasPagas;
  const lucroEstimado = faturamentoBruto - despesasTotais;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!novoGasto.descricao || !novoGasto.valor) return alert("Preencha os campos!");
    gastoService.create(novoGasto).then(() => {
      alert("Gasto registrado!");
      setNovoGasto({ descricao: "", valor: "", data: new Date().toISOString().split('T')[0], categoria: "OUTROS", fornecedor: "", pago: false });
      carregarDados();
    }).catch(error => alert("Erro: " + error.message));
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return setIsSelectionMode(false);
    if (window.confirm(`Excluir ${selectedIds.length} itens?`)) {
      try {
        await Promise.all(selectedIds.map(id => gastoService.delete(id)));
        setSelectedIds([]);
        setIsSelectionMode(false);
        carregarDados();
      } catch (error) {
        alert("Erro na exclusão.");
      }
    }
  };
  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedIds([]); 
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-center align-items-center position-relative mb-4 mt-3 w-100">
        <div className="text-center text-color">
          <h2 className="mb-0">Rose Pneus</h2>
          <h4 className="mb-0 text-muted">Painel Financeiro</h4>
        </div>
        <div className="position-absolute end-0">
          <Link to="/" className="btn btn-outline-secondary">Painel de fichas</Link>
        </div>
      </div>

      <FinanceiroCards 
        faturamento={faturamentoBruto} 
        despesas={despesasTotais} 
        pendentes={despesasPendentes} 
        lucro={lucroEstimado} 
      />

      <div className="row">
        <div className="col-md-4">
          <FinanceiroForm 
            novoGasto={novoGasto} 
            setNovoGasto={setNovoGasto} 
            onSubmit={handleSubmit} 
          />
        </div>
        <div className="col-md-8">
          <FinanceiroTable 
            gastos={gastos}
            isSelectionMode={isSelectionMode}
            setIsSelectionMode={setIsSelectionMode}
            selectedIds={selectedIds}
            toggleSelect={toggleSelect}
            handleBulkDelete={handleBulkDelete}
            onCancel={handleCancelSelection}
          />
        </div>
      </div>
    </div>
  );
}