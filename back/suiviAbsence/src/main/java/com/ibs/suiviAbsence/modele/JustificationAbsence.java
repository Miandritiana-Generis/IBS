package com.ibs.suiviAbsence.modele;

import java.security.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Table(name="justfication_absence")
@Entity
@NoArgsConstructor
public class JustificationAbsence {
    @Id
    Integer id;

    @Column
    int id_classe_etudiant;
    @Column
    String decription;
    @Column
    Timestamp date_time_debut;
    @Column
    Timestamp date_time_fin;
}
