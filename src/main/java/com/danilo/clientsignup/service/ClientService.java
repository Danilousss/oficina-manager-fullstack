package com.danilo.clientsignup.service;

import com.danilo.clientsignup.model.ClientFile;
import com.danilo.clientsignup.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;


    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public ClientFile saveClient(ClientFile clientFile){
        if(clientFile.getData() == null){
            clientFile.setData(LocalDate.now());
        }
        return clientRepository.save(clientFile);
    }

    public List<ClientFile> getAllClients(){
        return clientRepository.findAll();
    }

    public List<ClientFile> searchByName(String name){
        return clientRepository.findByNameContainingIgnoreCase(name);
    }

    public List<ClientFile> searchByPlaca(String placa){
        return clientRepository.findByPlacaContainingIgnoreCase(placa);
    }

    public List<ClientFile> searchByCarro(String carro){
        return clientRepository.findByCarroContainingIgnoreCase(carro);
    }

    public List<ClientFile> searchByData(LocalDate date){
        return clientRepository.findByData(date);
    }
    public void deleteClient(Long id){
         clientRepository.deleteById(id);
    }

    public ClientFile updateClient(Long id, ClientFile clientAtualizado){
        return clientRepository.findById(id).map(client -> {
            client.setName(clientAtualizado.getName());
            client.setPhone(clientAtualizado.getPhone());
            client.setCarro(clientAtualizado.getCarro());
            client.setPlaca(clientAtualizado.getPlaca());
            client.setQuilometragem(clientAtualizado.getQuilometragem());
            client.setPrice(clientAtualizado.getPrice());
            client.setFormaPagamento(clientAtualizado.getFormaPagamento());
            client.setServiceDescription(clientAtualizado.getServiceDescription());
            return clientRepository.save(client);
        }).orElseThrow(()-> new RuntimeException("Ficha não encontrada"));
    }



}
