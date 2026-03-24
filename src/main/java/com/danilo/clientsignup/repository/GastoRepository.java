package com.danilo.clientsignup.repository;

import com.danilo.clientsignup.model.Gastos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GastoRepository extends JpaRepository<Gastos, Long> {

}
