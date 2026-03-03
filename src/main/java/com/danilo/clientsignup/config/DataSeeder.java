package com.danilo.clientsignup.config;

import com.danilo.clientsignup.model.ClientFile;
import com.danilo.clientsignup.repository.ClientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Arrays;

@Configuration
public class DataSeeder implements CommandLineRunner {
    private final ClientRepository clientRepository;

    public DataSeeder(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if(clientRepository.count() ==0){
            ClientFile c1 = new ClientFile();
            c1.setName("Sabino");
            c1.setPhone("(12) 99887-6655");
            c1.setCarro("Chevrolet Corsa");
            c1.setPlaca("CPC6H50"); // Dados baseados na sua ficha real!
            c1.setServiceDescription("Troca de amortecedores e alinhamento");
            c1.setQuilometragem(138927);
            c1.setPrice(1425.00);
            c1.setData(LocalDate.now());
            c1.setFormaPagamento("Cartão de Crédito");

            ClientFile c2 = new ClientFile();
            c2.setName("Danilo Silva");
            c2.setPhone("(11) 98888-7777");
            c2.setCarro("Honda Civic");
            c2.setPlaca("DAN2026");
            c2.setServiceDescription("Revisão de 50.000km e troca de óleo");
            c2.setQuilometragem(50000);
            c2.setPrice(850.50);
            c2.setData(LocalDate.now().minusDays(2));
            c2.setFormaPagamento("Pix");

            ClientFile c3 = new ClientFile();
            c3.setName("Maria Oliveira");
            c3.setPhone("(12) 3344-5566");
            c3.setCarro("Fiat Uno");
            c3.setPlaca("UNO1H22");
            c3.setServiceDescription("Reparo no escapamento");
            c3.setQuilometragem(85000);
            c3.setPrice(320.00);
            c3.setData(LocalDate.now().minusMonths(1));
            c3.setFormaPagamento("Dinheiro");

            clientRepository.saveAll(Arrays.asList(c1,c2,c3));
            System.out.println("Banco populado com sucesso");
        }
    }
}
