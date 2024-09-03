package com.ibs.suiviAbsence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibs.suiviAbsence.modele.Presence;

import jakarta.transaction.Transactional;

public interface PresenceRepository extends JpaRepository<Presence, Integer>{
    public Presence findAllByIdEdt(int edt);

    @Modifying
    @Transactional
    @Query("UPDATE Presence p SET p.valideProf = 1 WHERE p.idEdt = :idEdt")
    public void validerFichePresence(@Param("idEdt") int idEdt);

    @Modifying
    @Transactional
    @Query("UPDATE Presence p SET p.valideDelegue = 1 WHERE p.idEdt = :idEdt")
    public void validerFichePresenceDelegue(@Param("idEdt") int idEdt);
}
