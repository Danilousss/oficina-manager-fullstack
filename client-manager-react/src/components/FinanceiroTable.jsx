import React from 'react';

export default function FinanceiroTable({ 
  gastos, isSelectionMode, setIsSelectionMode, selectedIds, toggleSelect, handleBulkDelete, onCancel 
}) {
  return (
    <div className="card shadow-sm p-3 border-dark">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-bold">Histórico de Despesas</h5>
        <div className="d-flex gap-2">
          {!isSelectionMode ? (
            <button className="btn btn-sm btn-outline-danger fw-bold" onClick={() => setIsSelectionMode(true)}>
              Modo Exclusão
            </button>
          ) : (
            <>
              <button className="btn btn-sm btn-danger fw-bold" onClick={handleBulkDelete}>
                Excluir ({selectedIds.length})
              </button>
              <button className="btn btn-sm btn-secondary fw-bold" onClick={onCancel}>
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-sm align-middle" style={{ fontSize: '0.9rem' }}>
          <thead className="bg-light border-bottom border-dark">
            <tr>
              {isSelectionMode && <th style={{width: '30px'}}></th>}
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map(g => (
              <tr 
                key={g.id} 
                className={`${isSelectionMode && selectedIds.includes(g.id) ? "table-danger" : ""} align-middle`}
                onClick={() => isSelectionMode && toggleSelect(g.id)}
                style={{ cursor: isSelectionMode ? 'pointer' : 'default' }}
              >
                {isSelectionMode && (
                  <td>
                    <input type="checkbox" className="form-check-input" checked={selectedIds.includes(g.id)} readOnly />
                  </td>
                )}
                <td>{new Date(g.data).toLocaleDateString('pt-BR')}</td>
                <td>{g.descricao}</td>
                <td><small className="badge bg-secondary opacity-75">{g.categoria}</small></td>
                <td className="text-danger fw-bold">R$ {g.valor.toFixed(2)}</td>
                <td>
                  <span className={`badge ${g.pago ? 'bg-success' : 'bg-secondary text-white'}`}>
                    {g.pago ? 'Pago' : 'Pendente'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}