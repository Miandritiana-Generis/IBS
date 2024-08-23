package com.ibs.suiviAbsence.modele;

import java.sql.Time;
import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Table(name="v_edt")
@Entity
@NoArgsConstructor
public class Edt {
    @Id
    private int id;
    @Column
    int id_matiere;
    @Column
    int id_classe;
    @Column
    int id_salle;
    @Column
    int id_enseignant;
    @Column
    boolean est_annule;
    @Column
    Date date;
    @Column
    Time debut;
    @Column
    Time fin;
    @Column
    String matiere;
    @Column
    String classe;
    @Column
    String enseignant;
    @Column
    String salle;
    @Column
    int id_personne;
    @Column
    int id_etudiant;

    


}
