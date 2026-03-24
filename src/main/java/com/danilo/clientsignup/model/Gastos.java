package com.danilo.clientsignup.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "gastos")
public class Gastos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String descricao;
    @Column(nullable = false)
    private Double valor;
    @Column(nullable = false)
    private LocalDate data;
    @Column(nullable = false)
    private boolean pago = false;
    @Enumerated(EnumType.STRING)
    private CategoriaGastos categoria;

    private String fornecedor;
}
