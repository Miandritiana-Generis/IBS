/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.ibs.suiviAbsence.repository;

import com.ibs.suiviAbsence.modele.ViewAutorisationPatDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author abc
 */
public interface ViewAutorisationPatDetailRepository extends JpaRepository<ViewAutorisationPatDetail, Integer>{
    @Query("SELECT a FROM ViewAutorisationPatDetail a WHERE " +
           "((a.idDirection = :idDirection AND a.toutPat = 1) OR " +
           "(a.idDirection = :idDirection AND a.toutPat = 0 AND a.idPat = :idPat)) " +
           "AND a.idFonctionnalite = :idFonctionnalite")
    List<ViewAutorisationPatDetail> findByDirectionAndPatAndFonctionnalite(
        @Param("idDirection") int idDirection,
        @Param("idPat") int idPat,
        @Param("idFonctionnalite") int idFonctionnalite
    );
}
