import { useEffect, useState } from 'react';
import { clientService } from './services/api';
import ClientForm from './components/ClientForm';
import SearchBar from './components/SearchBar';
import ClientTable from './components/ClientTable';

function App() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [editingId, setEditingId] = useState(null);

  const [newClient, setNewClient] = useState({
    name: "", phone: "", carro: "", placa: "", 
    quilometragem: "", serviceDescription: "", price: "", formaPagamento: ""
  });

  const [errors, setErrors] = useState({});

  const fetchClients = () => {
    clientService.getAll()
      .then(response => setClients(response.data))
      .catch(error => console.error("Erro ao buscar dados:", error));
  };

  useEffect(() => { fetchClients(); }, []);

  const handleSearch = () => {
    if (searchTerm) {
      clientService.search(searchType, searchTerm)
        .then(response => setClients(response.data))
        .catch(error => console.error("Erro na busca:", error));
    } else {
      fetchClients();
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let novosErros = {}; 

    if (!newClient.name.trim()) novosErros.name = "O nome é obrigatório.";
    if (!newClient.carro.trim()) novosErros.carro = "O veículo é obrigatório.";
    if (!newClient.quilometragem.toString().trim()) novosErros.quilometragem = "A quilometragem é obrigatória.";
    if (!newClient.price.toString().trim()) novosErros.price = "O valor é obrigatório.";
    if (!newClient.formaPagamento) novosErros.formaPagamento = "Selecione o pagamento.";
    if (!newClient.serviceDescription.trim()) novosErros.serviceDescription = "A descrição é obrigatória.";

    if (!newClient.phone.trim()) {    
      novosErros.phone = "O telefone é obrigatório.";
    } else {
      const apenasNumeros = newClient.phone.replace(/\D/g, ''); 
      if (apenasNumeros.length < 10 || apenasNumeros.length > 11) {
        novosErros.phone = "Telefone inválido (deve ter 10 ou 11 dígitos com DDD).";
      }
    }
    
    if (!newClient.placa.trim()) {
      novosErros.placa = "A placa é obrigatória.";
    } else {
      const placaRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
      if (!placaRegex.test(newClient.placa)) {
        novosErros.placa = "Use o padrão ABC1234 ou ABC1D23 (sem traços).";
      }
    }

    if (Object.keys(novosErros).length > 0) {
      setErrors(novosErros);
      return; 
    }

    setErrors({}); 

    const kmLimpo = newClient.quilometragem ? parseInt(newClient.quilometragem.toString().replace(/\./g, '')) : null;
    const precoLimpo = newClient.price ? parseFloat(newClient.price.toString().replace(',', '.')) : null;

    const dadosParaSalvar = {
      ...newClient,
      phone: newClient.phone.replace(/\D/g, ''),
      quilometragem: kmLimpo,
      price: precoLimpo 
    };

    if (editingId) {
      clientService.update(editingId, dadosParaSalvar)
        .then(() => {
          alert("Ficha atualizada com sucesso!");
          fetchClients();
          cancelEdit(); 
        })
        .catch(err => alert("Erro ao atualizar: " + err.message));
    } else {
      clientService.create(dadosParaSalvar)
        .then(() => {
          alert("Ficha cadastrada com sucesso!");
          fetchClients();
          setNewClient({ name: "", phone: "", carro: "", placa: "", quilometragem: "", serviceDescription: "", price: "", formaPagamento: "" });
        })
        .catch(err => alert("Erro ao salvar no banco: " + err.message));
    }
  }

  const handleDelete = (id, nomeCliente) => {
    if (window.confirm(`Tem certeza que deseja excluir a ficha de ${nomeCliente}? Essa ação não pode ser desfeita.`)) {
      clientService.delete(id)
        .then(() => { fetchClients(); })
        .catch(err => alert("Erro ao excluir: " + err.message));
    }
  };

  const handleEdit = (client) => {
    setNewClient({
      name: client.name,
      phone: client.phone,
      carro: client.carro,
      placa: client.placa,
      quilometragem: client.quilometragem ? client.quilometragem.toString() : "",
      serviceDescription: client.serviceDescription,
      price: client.price ? client.price.toString().replace('.', ',') : "", 
      formaPagamento: client.formaPagamento
    });
    setEditingId(client.id);
    setErrors({});
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewClient({ name: "",phone: "", carro: "", placa: "", quilometragem: "", serviceDescription: "", price: "", formaPagamento: "" });
    setErrors({});
  }

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-4 text-primary">Gerenciador de Fichas - Oficina</h2>

      {/* 1. COMPONENTE DE FORMULÁRIO */}
      <ClientForm 
        newClient={newClient} setNewClient={setNewClient}
        errors={errors} setErrors={setErrors}
        handleSave={handleSave}
        editingId={editingId} cancelEdit={cancelEdit}
      />

      <div className="card shadow-sm p-3 mb-5">
        
        {/* 2. COMPONENTE DA BARRA DE BUSCA */}
        <SearchBar 
          searchType={searchType} setSearchType={setSearchType}
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />

        {/* 3. COMPONENTE DA TABELA */}
        <ClientTable 
          clients={clients} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />

        <div className="text-end mt-2">
          <h4>Total Filtrado: <span className="text-primary">R$ {clients.reduce((acc, curr) => acc + (curr.price || 0), 0).toFixed(2)}</span></h4>
        </div>
      </div>
    </div>
  );
}

export default App;