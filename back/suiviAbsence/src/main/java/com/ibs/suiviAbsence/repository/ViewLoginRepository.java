/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.ibs.suiviAbsence.repository;

import com.ibs.suiviAbsence.modele.ViewLogin;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author abc
 */
public interface ViewLoginRepository extends JpaRepository<ViewLogin, Long>{
    @Query(value= "select id,login,password,coalesce(id_pat,0)id_pat,coalesce(id_enseignant,0)id_enseignant,coalesce(id_etudiant,0)id_etudiant,est_valide,id_personne from login where login=:login ;",nativeQuery = true)
    public List<ViewLogin> findByLogin(String login);
    
    @Query(value="select * from V_Login v where v.id in ( select id_login from Token where token = :token) and v.est_valide is true", nativeQuery = true)
    public ViewLogin findLoginByToken(@Param("token") String token);
}
