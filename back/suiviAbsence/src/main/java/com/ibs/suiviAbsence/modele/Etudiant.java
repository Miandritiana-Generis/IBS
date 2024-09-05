package com.ibs.suiviAbsence.modele;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Table(name="etudiant")
@Entity
@NoArgsConstructor
public class Etudiant {
    @Id
    Integer id;

    @Column(name="id_personne")
    int idPersonne;
    @Column
    int id_pere;
    @Column
    int id_mere;
}
