package com.ibs.suiviAbsence.modele;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.Date;

/**
 *
 * @author abc
 */
@Getter
@Setter
@Table(name="annee_scolaire")
@Entity
@NoArgsConstructor
public class AnneeScolaire {

    @Id
    private int id;

    @Column(name="annee_debut")
    private int anneeDebut;

    @Column(name = "annee_fin")
    private int anneeFin;

    @Column(name = "datedebut")
    private Date dateDebut;

    @Column(name = "datefin")
    private Date dateFin;

    @Column(name = "id_session")
    private int idSession;
}
