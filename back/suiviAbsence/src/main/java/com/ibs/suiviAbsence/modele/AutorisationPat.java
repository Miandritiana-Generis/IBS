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
@Table(name="autorisation_pat")
@Entity
@NoArgsConstructor
public class AutorisationPat {
    @Id
    private int id;
    @Column
    private int idDirection;
    @Column
    private int idFonctionnalite;
    @Column
    private int toutPat;
}
