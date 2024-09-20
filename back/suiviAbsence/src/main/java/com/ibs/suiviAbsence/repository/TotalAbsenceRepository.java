package com.ibs.suiviAbsence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibs.suiviAbsence.modele.ViewPresenceAbsence;

public interface TotalAbsenceRepository extends JpaRepository<ViewPresenceAbsence, Integer>{
    
    @Query(value = "select count(*) from v_presence_absence where is_present = false and (:date is null or date = cast(:date as date)) and (:idClasse is null or id_classe = :idClasse)", nativeQuery = true)
    long countAbsences(@Param("date") String date, @Param("idClasse") Integer idClasse);
}
