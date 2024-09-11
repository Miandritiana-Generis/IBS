package com.ibs.common.ibs_common.model.gestionFichier;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


//@Entity
//@Table(name = "oc_expiration_mail_envoye")
@Getter
@Setter
public class OCExpirationMailEnvoye {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") 
    private Long id;

    @Column
    private Integer id_oc_share;
}
