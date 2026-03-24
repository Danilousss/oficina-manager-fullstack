package com.danilo.clientsignup.controller;

import com.danilo.clientsignup.model.Gastos;
import com.danilo.clientsignup.repository.GastoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gastos")
@CrossOrigin("*")
public class GastoController {
    @Autowired
    private GastoRepository repository;

    @GetMapping
    public List<Gastos> Listartodos(){
        return repository.findAll();
    }

    @PostMapping
    public Gastos salvar(@RequestBody Gastos gastos){
        return repository.save(gastos);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        repository.deleteById(id);
    }

}
