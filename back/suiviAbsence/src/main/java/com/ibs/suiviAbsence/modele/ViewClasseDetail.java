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
@Table(name="v_classe_detail")
@Entity
@NoArgsConstructor
public class ViewClasseDetail {
    @Id
    private int id;
    @Column
    private String classe;
    @Column
    private int id_filiere;
    @Column
    private String filiere;
    @Column
    private int id_niveau;
    @Column
    private String niveau;
}
