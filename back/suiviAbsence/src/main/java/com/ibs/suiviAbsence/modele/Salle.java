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
@Table(name="salle")
@Entity
@NoArgsConstructor
public class Salle {
    @Id
    private int id;

    @Column
    String nom;


}
