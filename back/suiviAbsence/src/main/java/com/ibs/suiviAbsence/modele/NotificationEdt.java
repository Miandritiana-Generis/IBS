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
@Table(name="notificationedt")
@Entity
@NoArgsConstructor
public class NotificationEdt {
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
    private int type;
    
    public NotificationEdt(String contenue, Timestamp dateheure, int idEdt) {
        this.contenue = contenue;
        this.dateheure = dateheure;
        this.idEdt = idEdt;
    }
    
    public NotificationEdt(String contenue, Timestamp dateheure, int idEdt,int type) {
        this.contenue = contenue;
        this.dateheure = dateheure;
        this.idEdt = idEdt;
        this.type=type;
    }
}
