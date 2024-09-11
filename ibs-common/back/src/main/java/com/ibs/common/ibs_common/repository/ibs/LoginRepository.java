/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.ibs.common.ibs_common.repository.ibs;

import com.ibs.common.ibs_common.model.ibs.Login;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author abc
 */
public interface LoginRepository extends JpaRepository<Login, Long>{
    @Query(value= "select id,login,password,coalesce(id_pat,0)id_pat,coalesce(id_enseignant,0)id_enseignant,coalesce(id_etudiant,0)id_etudiant,est_valide,id_personne from login where login=:login ;",nativeQuery = true)
    public List<Login> findByLogin(String login);
}
