
function ClientTable({ clients, onEdit, onDelete }) {
  return (
    <div className="border rounded shadow-sm overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="red-of">
            <tr>
              <th>Data</th>
              <th>Cliente</th>
              <th>Carro/Placa</th>
              <th>KM</th>
              <th>Serviço</th>
              <th>Valor</th>
              <th>Pagamento</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(c => (
              <tr key={c.id}>
                {/* Lógica de formatação de data preservada */}
                <td>{c.data ? c.data.split('-').reverse().join('/') : '-'}</td>
                <td>{c.name}<br/><small className="text-muted">{c.phone}</small></td>
                <td>{c.carro}<br/><span className="badge bg-info text-dark">{c.placa}</span></td>
                <td>{c.quilometragem?.toLocaleString()} km</td>
                <td>{c.serviceDescription}</td>
                <td className="fw-bold text-success">R$ {c.price?.toFixed(2)}</td>
                
                {/* Lógica do Badge de Pagamento */}
                <td>
                  <span className={`badge ${
                    c.formaPagamento === 'Pix' ? 'bg-primary' : 
                    c.formaPagamento === 'Cartão' ? 'bg-success' : 'bg-secondary'
                  }`}>
                    {c.formaPagamento || 'Não informado'}
                  </span>
                </td>

                {/* Botões com tamanhos unificados */}
                <td className="text-center align-middle">
                  <div className="d-flex justify-content-center flex-wrap gap-2">
                    <button 
                      className="btn btn-sm btn-outline-dark fw-bold" 
                      style={{ width: '80px' }} 
                      onClick={() => onEdit(c)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger fw-bold" 
                      style={{ width: '80px' }} 
                      onClick={() => onDelete(c.id, c.name)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clients.length === 0 && (
          <p className="text-center text-muted mt-3">Nenhum registro encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default ClientTable;