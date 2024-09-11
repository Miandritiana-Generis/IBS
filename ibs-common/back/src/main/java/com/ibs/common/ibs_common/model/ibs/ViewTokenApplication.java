package com.ibs.common.ibs_common.model.ibs;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="V_Token_Application ")
public class ViewTokenApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="id_token")
    private int idToken;
    @Column(name="id_application")
    private int idApplication;
    @Column
    private String lien;
    @Column
    private String nom;
}
