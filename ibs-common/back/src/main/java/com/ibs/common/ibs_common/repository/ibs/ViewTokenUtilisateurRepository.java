/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.ibs.common.ibs_common.repository.ibs;

import com.ibs.common.ibs_common.model.ibs.ViewTokenUtilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author abc
 */
public interface ViewTokenUtilisateurRepository extends JpaRepository<ViewTokenUtilisateur, Integer> {
    public ViewTokenUtilisateur findAllByToken(String token);
}
