package com.ibs.suiviAbsence.modele;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Table(name="personne")
@Entity
@NoArgsConstructor
public class Personne {
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
    String mdp;
    
}
