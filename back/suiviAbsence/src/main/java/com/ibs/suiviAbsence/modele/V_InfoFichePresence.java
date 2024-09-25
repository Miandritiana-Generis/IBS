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
@Table(name="v_infofichepresence")
@Entity
@NoArgsConstructor
public class V_InfoFichePresence {
    @Id
    private Long id;

    @Column
    private int id_classe_etudiant;
    @Column
    private int id_edt;
    @Column
    private String nom;
    @Column
    private String prenom;
    @Column
    private String photo;
    @Column
    private Time heure_arrive;
    @Column
    private Boolean status;
    @Column
    private String salle;
    @Column
    private String matiere;
    @Column
    private String enseignant;
    @Column
    private String classe;
    @Column
    private Date date;
    @Column
    private Time debut;
    @Column
    private Time fin;
    @Column
    private int id_salle;
    @Column
    private int id_personne;

}