package com.ibs.suiviAbsence.modele;

import java.sql.Time;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Table(name="presence_detail")
@Entity
@NoArgsConstructor
public class DetailPresence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private int idPresence;
    private int idClasseEtudiant;
    private Time tempsArriver;
    
    public DetailPresence(int idPresence, int idClasseEtudiant,Time tempsArriver){
        this.idPresence=idPresence;
        this.idClasseEtudiant=idClasseEtudiant;
        this.tempsArriver=tempsArriver;
    }
}
