import React from 'react';

export default function FinanceiroForm({ novoGasto, setNovoGasto, onSubmit }) {
  return (
    <div className="card shadow-sm border-dark">
      <div className="card-header red-of text-white fw-bold">Novo Gasto</div>
      <form className="card-body" onSubmit={onSubmit}>
        <div className="mb-2">
          <label className="form-label fw-bold small">Descrição *</label>
          <input type="text" className="form-control form-control-sm" value={novoGasto.descricao} 
            onChange={e => setNovoGasto({...novoGasto, descricao: e.target.value})} />
        </div>
        <div className="mb-2">
          <label className="form-label fw-bold small">Valor (R$) *</label>
          <input type="number" step="0.01" className="form-control form-control-sm" value={novoGasto.valor} 
            onChange={e => setNovoGasto({...novoGasto, valor: e.target.value})} />
        </div>
        <div className="mb-2">
          <label className="form-label fw-bold small">Data *</label>
          <input type="date" className="form-control form-control-sm" value={novoGasto.data} 
            onChange={e => setNovoGasto({...novoGasto, data: e.target.value})} />
        </div>
        <div className="mb-2">
          <label className="form-label fw-bold small">Categoria</label>
          <select className="form-select form-select-sm" value={novoGasto.categoria} 
            onChange={e => setNovoGasto({...novoGasto, categoria: e.target.value})}>
            <option value="PECAS">Peças</option>
            <option value="MANUTENCAO">Manutenção</option>
            <option value="ALUGUEL">Aluguel</option>
            <option value="PESSOAL">Pessoal</option>
            <option value="FERRAMENTAS">Ferramentas</option>
            <option value="CONTAS">Contas</option>
            <option value="FUNCIONARIOS">Funcionários</option>
            <option value="OUTROS">Outros</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label fw-bold small">Fornecedor</label>
          <input type="text" className="form-control form-control-sm" value={novoGasto.fornecedor} 
            onChange={e => setNovoGasto({...novoGasto, fornecedor: e.target.value})} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="pago"
            checked={novoGasto.pago} onChange={e => setNovoGasto({...novoGasto, pago: e.target.checked})} />
          <label className="form-check-label small fw-bold" htmlFor="pago">Já foi pago?</label>
        </div>
        <button type="submit" className="btn red-of text-white w-100 shadow-sm fw-bold">Gravar Gasto</button>
      </form>
    </div>
  );
}