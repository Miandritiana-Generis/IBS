/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.modele;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author abc
 */
@Getter
@Setter
@Table(name="v_notificationedt")
@Entity
@NoArgsConstructor
public class ViewNotificationEdt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String contenue;
    @Column
    private Timestamp dateheure;
    @Column
    private int idEdt;
    @Column
    private String matiere;
    @Column
    private String salle;
    @Column
    private Date date;
    @Column
    private Time debut;
    @Column
    private Time fin;
    @Column
    private String enseignant;
    @Column
    private int type;
    
}
