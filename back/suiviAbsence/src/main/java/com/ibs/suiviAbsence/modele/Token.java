package com.ibs.suiviAbsence.modele;

import java.sql.Timestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Table(name="token")
@Entity
@NoArgsConstructor
public class Token {

    @Id
    Integer id;

    @Column
    int id_personne;

    @Column
    String id_appareil;

    @Column
    String token;

    @Column
    Timestamp expiration;


}
