package com.ufg.stage.gate.tcc.models.entities;

import com.ufg.stage.gate.tcc.models.enums.UserTypeEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "app_user")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String email;

    @Enumerated(EnumType.STRING)
    private UserTypeEnum type;

    @ManyToMany(mappedBy = "participants", fetch = FetchType.LAZY)
    private Set<Meeting> meetings;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
