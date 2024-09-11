package com.ibs.common.ibs_common.model.gestionFichier;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

//@Entity
//@Table(name = "v_oc_share")
@Getter
@Setter
public class VOcShare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") 
    private Long id;

    @Column
    private Timestamp expiration;

    @Column
    private String file_target;

    @Column 
    private int file_source;

    @Column
    private String item_type;
}
