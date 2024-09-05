/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.modele;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Date;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author abc
 */
@Getter
@Setter
@Table(name="v_all_info_classe_etudiant")
@Entity
@NoArgsConstructor
public class ViewClasseEtudiantAllInfo {
    @Id
    private int id;
    @Column
    private int idClasse;
    @Column
    private int idEtudiant;
    @Column 
    private int idAnneeScolaire;
    @Column
    private Date datedebut;
    @Column
    private Date datefin;
    @Column
    private String nom;
    @Column
    private String prenom;
}
