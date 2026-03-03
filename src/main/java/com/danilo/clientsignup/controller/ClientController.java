package com.danilo.clientsignup.controller;

import com.danilo.clientsignup.model.ClientFile;
import com.danilo.clientsignup.service.ClientService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://localhost:5173")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    public ClientFile create(@RequestBody ClientFile clientFile){
        return clientService.saveClient(clientFile);
    }
    @GetMapping
    public List<ClientFile> listAll(){
        return clientService.getAllClients();
    }
    @GetMapping("/search")
    public List<ClientFile> search(@RequestParam(required = false)String name,
                                   @RequestParam(required = false)String placa,
                                   @RequestParam(required = false)String carro,
                                   @RequestParam(required = false)@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate data){
        if(name != null) return clientService.searchByName(name);
        if(placa != null) return clientService.searchByPlaca(placa);
        if(carro != null) return clientService.searchByCarro(carro);
        if(data != null) return clientService.searchByData(data);

        return clientService.getAllClients();

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();

    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientFile> updateClient(@PathVariable Long id, @RequestBody ClientFile client){
        return ResponseEntity.ok(clientService.updateClient(id,client));
    }
}
