package com.ibs.suiviAbsence.dto;

import com.ibs.suiviAbsence.modele.ViewAbsentDetailTotalHMatiere;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AbsentDetailsDTO {
    private Integer idAnneeScolaire;
    private Integer anneeDebut;
    private Integer anneeFin;
    private Integer idClasse;
    private String classe;
    private Integer idEtudiant;
    private String photo;
    private String nom;
    private String prenom;
    private String totalHeureAbsence;
    private ViewAbsentDetailTotalHMatiere[] details;
}

