package com.danilo.clientsignup.repository;

import com.danilo.clientsignup.model.ClientFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface ClientRepository extends JpaRepository<ClientFile, Long> {
    List<ClientFile> findByPlacaContainingIgnoreCase(String placa);
    List<ClientFile> findByCarroContainingIgnoreCase(String carro);
    List<ClientFile> findByNameContainingIgnoreCase(String name);
    List<ClientFile> findByData(LocalDate data);
}
