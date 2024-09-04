/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.ibs.suiviAbsence.repository;

import com.ibs.suiviAbsence.modele.ViewPersonneStatut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author abc
 */
public interface ViewPersonneStatutRepository extends JpaRepository<ViewPersonneStatut, Integer>{
    @Query(value="select * from v_personne_statut v where v.id in ( select id_personne from Token where token = :token) ", nativeQuery = true)
    public ViewPersonneStatut findPersonneByToken(@Param("token") String token);
}
