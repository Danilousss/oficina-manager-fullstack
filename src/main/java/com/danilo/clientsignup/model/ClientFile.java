package com.danilo.clientsignup.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data

public class ClientFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do cliente é obrigatório")
    private String name;

    @NotBlank(message = "O telefone do cliente é obrigatório")
    private String phone;

    @PositiveOrZero(message = "O valor não pode ser negativo")
    private Double price;

    @Column(columnDefinition = "TEXT")
    private String serviceDescription;

    private String placa;
    private String carro;
    private LocalDate data;
    private String formaPagamento;
    private Integer quilometragem;


}
