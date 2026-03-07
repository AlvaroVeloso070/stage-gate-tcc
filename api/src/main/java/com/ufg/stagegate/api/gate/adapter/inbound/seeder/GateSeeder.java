package com.ufg.stagegate.api.gate.adapter.inbound.seeder;

import com.ufg.stagegate.api.gate.adapter.outbound.persistence.GateJpaRepository;
import com.ufg.stagegate.api.gate.domain.model.Gate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class GateSeeder implements CommandLineRunner {

    private final GateJpaRepository gateJpaRepository;

    @Override
    @Transactional
    public void run(String @NonNull ... args) {
        if (gateJpaRepository.count() == 0) {
            log.info("Seeding default gates...");
            
            Gate gate1 = new Gate();
            gate1.setNumber((short) 1);
            gate1.setName("Ideação");
            gate1.setHasDeliverable(true);

            Gate gate2 = new Gate();
            gate2.setNumber((short) 2);
            gate2.setName("Planejamento");
            gate2.setHasDeliverable(true);

            Gate gate3 = new Gate();
            gate3.setNumber((short) 3);
            gate3.setName("Desenvolvimento");
            gate3.setHasDeliverable(false);

            Gate gate4 = new Gate();
            gate4.setNumber((short) 4);
            gate4.setName("Resultados");
            gate4.setHasDeliverable(false);

            Gate gate5 = new Gate();
            gate5.setNumber((short) 5);
            gate5.setName("Redação");
            gate5.setHasDeliverable(true);

            Gate gate6 = new Gate();
            gate6.setNumber((short) 6);
            gate6.setName("Defesa");
            gate6.setHasDeliverable(true);

            gateJpaRepository.saveAll(List.of(gate1, gate2, gate3, gate4, gate5, gate6));
            log.info("Successfully seeded 6 default gates.");
        }
    }
}
