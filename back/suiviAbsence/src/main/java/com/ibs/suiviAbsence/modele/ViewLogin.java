/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.modele;

/**
 *
 * @author abc
 */

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="v_login")
public class ViewLogin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String login;
    @Column
    private String password;
    @Column(name="id_pat")
    @Nullable
    private int idPat;
    @Column(name="id_enseignant")
    @Nullable
    private int idEnseignant;
    @Column(name="id_etudiant")
    @Nullable
    private int idEtudiant;
    @Column(name="id_personne")
    @Nullable
    private int idPersonne;
    @Column
    private int idDirection;
}
