import { useEffect, useState } from 'react';
import { clientService } from '../services/api';
import ClientForm from '../components/ClientForm';
import SearchBar from '../components/SearchBar';
import ClientTable from '../components/ClientTable';
import { Link } from 'react-router-dom';

export default function Fichas() {
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
      .catch(error => console.error("API offline - Dados de mostruário",error));

    setClients([
      {
      id: 1,
          name: "João Silva",
          phone: "(11) 98888-7777",
          carro: "Honda Civic",
          placa: "ABC1D23",
          quilometragem: "85000",
          serviceDescription: "Troca de 4 pneus Pirelli + Alinhamento e Balanceamento",
          price: 1850.00,
          formaPagamento: "Cartão",
          data: "2026-04-02"
      },
      {
        id: 2,
          name: "Mariana Costa",
          phone: "(12) 97777-6666",
          carro: "Chevrolet Onix",
          placa: "DEF4G56",
          quilometragem: "42000",
          serviceDescription: "Revisão de freios e troca de pastilhas",
          price: 450.00,
          formaPagamento: "Pix",
          data: "2026-04-05"
      },{
        id: 3,
          name: "Ricardo Alves",
          phone: "(11) 91234-5678",
          carro: "Toyota Corolla",
          placa: "GHI7J89",
          quilometragem: "125000",
          serviceDescription: "Conserto de pneu furado e rodízio",
          price: 80.00,
          formaPagamento: "Dinheiro",
          data: "2026-04-07"
      },{
        id: 4,
          name: "Cláudia Souza",
          phone: "(11) 95555-4444",
          carro: "Jeep Renegade",
          placa: "JKL0M12",
          quilometragem: "28000",
          serviceDescription: "Troca de óleo e filtro + check-up de suspensão",
          price: 320.00,
          formaPagamento: "Cartão",
          data: "2026-04-07"
      }
  
  ])

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
    <div className='d-flex justify-content-center align-items-center position-relative mb-4 mt-3'>

      <div className='text-center mb-1 text-color'>
        <h2 className='mb-0'>Rose Pneus</h2>
        <h4 className='mb-3 text-muted'>Gerenciador de fichas</h4>
      </div>

      <div className='position-absolute end-0'>
        <Link to= "/financeiro"className='btn btn-outline-green-of-light shadow-sm d-flex align-items-center'>
           Painel Financeiro 
        </Link>
      </div>

    </div>  
      <ClientForm 
        newClient={newClient} setNewClient={setNewClient}
        errors={errors} setErrors={setErrors}
        handleSave={handleSave}
        editingId={editingId} cancelEdit={cancelEdit}
      />

      <div className="card shadow-sm p-3 mb-5 border-dark">
        
        <SearchBar 
          searchType={searchType} setSearchType={setSearchType}
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />

        <ClientTable 
          clients={clients} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>
    </div>
  );
}

