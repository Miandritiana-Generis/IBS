package com.ibs.common.ibs_common.repository.gestionFichier;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ibs.common.ibs_common.model.gestionFichier.VOcShare;

public interface VOcShareRepository  {
//JpaRepository<VOcShare, Long> {
    
    @Query(value = "SELECT * FROM v_oc_share WHERE expiration::date = (CURRENT_DATE + INTERVAL '1 day')::date", nativeQuery = true)
    public List<VOcShare> getExpiration();


    @Query(value = "select * from v_oc_share v where v.id not in (select o.id_oc_share from oc_expiration_mail_envoye o) and v.expiration = CURRENT_DATE + INTERVAL '1 day'", nativeQuery = true)
    public List<VOcShare> getExpirationPasEncoreEnvoyé();
    
}
