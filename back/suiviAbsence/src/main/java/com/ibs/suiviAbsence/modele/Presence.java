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
@Table(name="edt")
@Entity
@NoArgsConstructor
public class Presence {
    @Id
    private int id;
    @Column
    private int idEdt;
    @Column
    private int valideProf;
    @Column
    private int valideDelegue;
}
