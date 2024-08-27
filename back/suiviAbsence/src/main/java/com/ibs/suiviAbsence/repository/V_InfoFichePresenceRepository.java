package com.ibs.suiviAbsence.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibs.suiviAbsence.modele.V_InfoFichePresence;

public interface V_InfoFichePresenceRepository  extends JpaRepository<V_InfoFichePresence, Long> {

    @Query(value = "SELECT * FROM v_infoFichePresence WHERE CAST(v_infoFichePresence.date AS DATE) = COALESCE(CAST(:date AS DATE), current_date) AND COALESCE(CAST(:heure AS TIME), current_time) BETWEEN v_infoFichePresence.debut AND v_infoFichePresence.fin AND id_salle = :id_salle", nativeQuery = true)
    public List<V_InfoFichePresence> getInfoFichePresence(@Param("id_salle") int id_salle, @Param("heure") String heure, @Param("date") String date);
    

}
