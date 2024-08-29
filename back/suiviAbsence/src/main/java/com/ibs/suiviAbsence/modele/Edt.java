package com.ibs.suiviAbsence.modele;

import java.sql.Date;
import java.sql.Time;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Table(name="edt")
@Entity
@NoArgsConstructor
public class Edt {
    @Id
    private int id;
    @Column
    int idMatiere;
    @Column
    int idClasse;
    @Column
    int idSalle;
    @Column
    int idEnseignant;
    @Column
    boolean estAnnule;
    @Column(name="date")
    Date date;
    @Column
    Time debut;
    @Column
    Time fin; 
}
