/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.common.ibs_common.model.ibs;


import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author USER
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="token")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String token ;
    @Column
    private Timestamp expiration;
    @Column(name="id_appareil")
    private String idAppareil;
    @Column(name="id_personne")
    private int idPersonne;
    @Column(name="id_login")
    private int idLogin;
    
    public Token (String token, Timestamp expiration, String idAppareil , int idPersonne){
        this.token=token;
        this.expiration=expiration;
        this.expiration=expiration;
        this.idAppareil=idAppareil;
        this.idPersonne=idPersonne;
    }

    public Token(String token, Timestamp expiration, String idAppareil, int idPersonne, int idLogin) {
        this.token = token;
        this.expiration = expiration;
        this.idAppareil = idAppareil;
        this.idPersonne = idPersonne;
        this.idLogin = idLogin;
    }
    
    
}
