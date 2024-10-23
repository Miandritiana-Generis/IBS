package com.ibs.suiviAbsence.modele;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="v_absent_total_h")
public class ViewAbsentTotalH {
    
    @Column(name = "id_annee_scolaire")
    private int idAnneeScolaire;

    @Column(name = "annee_debut")
    private int anneeDebut;

    @Column(name = "annee_fin")
    private int anneeFin;

    @Id
    @Column(name = "id_classe")
    private int idClasse;

    @Column
    private String classe;

    @Column(name = "id_etudiant")
    private int idEtudiant;

    @Column
    private String photo;

    @Column
    private String nom;

    @Column 
    private String prenom;

    @Column(name = "total_heure_absence")
    private String totalHeureAbsence;
    
}
