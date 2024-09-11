package com.ibs.common.ibs_common.repository.gestionFichier;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ibs.common.ibs_common.model.gestionFichier.OCExpirationMailEnvoye;

import jakarta.transaction.Transactional;

public interface OCExpirationMailEnvoyeRepository {
//        extends JpaRepository<OCExpirationMailEnvoye, Long>{
    
//    @Modifying
//    @Transactional
//    @Query( value ="INSERT INTO oc_expiration_mail_envoye (id_oc_share) values (:id_share)", nativeQuery = true)
//    public void insertExporation(Long id_share);
}
