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
@Table(name="classe_etudiant")
@Entity
@NoArgsConstructor
public class ClasseEtudiant {

    @Id
    Integer id;

    @Column
    int id_classe;

    @Column(name="id_etudiant")
    int idEtudiant;

    @Column
    int id_annee_scolaire;

    @Column
    int est_delegue;




}
