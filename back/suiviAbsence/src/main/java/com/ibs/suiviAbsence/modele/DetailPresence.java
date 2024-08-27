package com.ibs.suiviAbsence.modele;

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
public class DetailPresence {
    @Id
    private int id;
    @Column
    private int idPresence;
    private int idClasseEtudiant;
    private Time tempsArriver;

}
