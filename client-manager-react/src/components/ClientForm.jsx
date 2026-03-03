
export default function ClientForm({ 
  newClient, setNewClient, 
  errors, setErrors, 
  handleSave, 
  editingId, cancelEdit 
}) {
  return (
    <div className="card shadow-sm mb-4 border-primary">
      <div className={`card-header text-white ${editingId ? 'bg-warning text-dark fw-bold' : 'bg-primary'}`}>
        {editingId ? "Editando Ficha de Serviço" : "Nova Ficha de Serviço"}
      </div>
      
      <form onSubmit={handleSave} className="card-body row g-3" noValidate>
        
        <div className="col-md-4">
          <label className="form-label fw-bold">Cliente <span className="text-danger">*</span></label>
          <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Ex: Sabino" value={newClient.name} 
            onChange={e => { setNewClient({...newClient, name: e.target.value}); setErrors({...errors, name: null}); }} />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label fw-bold">Telefone <span className="text-danger">*</span></label>
          <input type="text" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} placeholder="(12) 99999-9999" value={newClient.phone} 
            onChange={e => { setNewClient({...newClient, phone: e.target.value}); setErrors({...errors, phone: null}); }} />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label fw-bold">Veículo <span className="text-danger">*</span></label>
          <input type="text" className={`form-control ${errors.carro ? 'is-invalid' : ''}`} placeholder="Modelo do carro" value={newClient.carro} 
            onChange={e => { setNewClient({...newClient, carro: e.target.value}); setErrors({...errors, carro: null}); }} />
          {errors.carro && <div className="invalid-feedback">{errors.carro}</div>}
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold">Placa <span className="text-danger">*</span></label>
          <input type="text" className={`form-control ${errors.placa ? 'is-invalid' : ''}`} placeholder="ABC1234" value={newClient.placa} 
            onChange={e => { setNewClient({...newClient, placa: e.target.value.toUpperCase().replace(/-/g, '')}); setErrors({...errors, placa: null}); }} />
          {errors.placa && <div className="invalid-feedback">{errors.placa}</div>}
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold">KM Atual <span className="text-danger">*</span></label>
          <input type="text" className={`form-control ${errors.quilometragem ? 'is-invalid' : ''}`} placeholder="Ex: 180.000" value={newClient.quilometragem} 
            onChange={e => { setNewClient({...newClient, quilometragem: e.target.value}); setErrors({...errors, quilometragem: null}); }} />
          {errors.quilometragem && <div className="invalid-feedback">{errors.quilometragem}</div>}
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold">Valor (R$) <span className="text-danger">*</span></label>
          <input type="text" className={`form-control ${errors.price ? 'is-invalid' : ''}`} placeholder="Ex: 340,00" value={newClient.price} 
            onChange={e => { setNewClient({...newClient, price: e.target.value}); setErrors({...errors, price: null}); }} />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold">Pagamento <span className="text-danger">*</span></label>
          <select className={`form-select ${errors.formaPagamento ? 'is-invalid' : ''}`} value={newClient.formaPagamento} 
            onChange={e => { setNewClient({...newClient, formaPagamento: e.target.value}); setErrors({...errors, formaPagamento: null}); }}>
            <option value="">Selecione...</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão">Cartão</option>
            <option value="Pix">Pix</option>
          </select>
          {errors.formaPagamento && <div className="invalid-feedback">{errors.formaPagamento}</div>}
        </div>

        <div className="col-12">
          <label className="form-label fw-bold">Descrição do Serviço <span className="text-danger">*</span></label>
          <textarea className={`form-control ${errors.serviceDescription ? 'is-invalid' : ''}`} rows="2" value={newClient.serviceDescription} 
            onChange={e => { setNewClient({...newClient, serviceDescription: e.target.value}); setErrors({...errors, serviceDescription: null}); }}></textarea>
          {errors.serviceDescription && <div className="invalid-feedback">{errors.serviceDescription}</div>}
        </div>

        <div className="col-12 text-end">
          {editingId && (
            <button type="button" className="btn btn-secondary px-4 me-2 shadow-sm" onClick={cancelEdit}>Cancelar</button>
          )}
          <button type="submit" className={`btn ${editingId ? 'btn-warning' : 'btn-success'} px-5 shadow-sm`}>
            {editingId ? "Atualizar Ficha" : "Gravar no Sistema"}
          </button>
        </div>
      </form>
    </div>
  );
}