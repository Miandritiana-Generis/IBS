/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.modele;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author abc
 */
@Getter
@Setter
@Table(name="v_personne_statut")
@Entity
@NoArgsConstructor
public class ViewPersonneStatut {
    @Id
    private int id;
    @Column
    String nom;
    @Column
    String prenom;
    @Column
    String genre;
    @Column
    String mail;
    @Column
    String contact;
    @Column
    String login;
    @Column
    int idEtudiant;
    @Column
    int idPat;
    @Column
    int idEnseignant;
}
