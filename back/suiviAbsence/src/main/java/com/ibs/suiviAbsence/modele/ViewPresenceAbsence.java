package com.ibs.suiviAbsence.modele;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Table(name="v_presence_absence")
@Entity
@NoArgsConstructor
public class ViewPresenceAbsence {
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
    @Column
    int idMatiere;
    @Column(name="date")
    Date date;
    @Column
    Time debut;
    @Column
    Time fin; 
    @Column
    private int idEdt;
    @Column
    private int valideProf;
    @Column
    private int valideDelegue;
    @Column
    private boolean isPresent;
    @Column
    private String nom;
    @Column
    private String prenom ;
    @Column
    private String classe ;
    @Column
    private String matiere;
    @Column
    private String enseignant;
    @Column
    private String salle ;
    @Column
    private String photo ;
    @Column
    private String description ;
    @Column
    Timestamp dateTimeDebut;
    @Column
    Timestamp dateTimeFin;


}
