/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.ibs.suiviAbsence.repository;

import com.ibs.suiviAbsence.modele.ViewClasseEtudiant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author abc
 */
public interface ViewClasseEtudiantRepository extends JpaRepository<ViewClasseEtudiant, Integer>{
    @Query("SELECT c FROM ViewClasseEtudiant c WHERE c.idEtudiant = :idEtudiant AND CURRENT_DATE BETWEEN c.datedebut AND c.datefin")
    List<ViewClasseEtudiant> findClasseEtudiantAtCurrentDate(
        @Param("idEtudiant") int idEtudiant
    ); 
    
}
