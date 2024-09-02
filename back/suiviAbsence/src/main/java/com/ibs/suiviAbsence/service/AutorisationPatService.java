/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.service;

import com.ibs.suiviAbsence.modele.ViewAutorisationPatDetail;
import com.ibs.suiviAbsence.repository.ViewAutorisationPatDetailRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author abc
 */
@Service
public class AutorisationPatService {
    @Autowired
    ViewAutorisationPatDetailRepository viewAutorisationPatDetailRepository;
    /**
     * Cette fonction permet de verifier si une direction ou PAT a une autorisation a une fonctionnalite donne
     * @param idFonctionnalite
     * @param idDirection
     * @param idPat
     * @return 
     */
    public boolean estAutoriser(int idFonctionnalite,int idDirection,int idPat){
        boolean verifier=false;
        List<ViewAutorisationPatDetail> liste= this.viewAutorisationPatDetailRepository.findByDirectionAndPatAndFonctionnalite(idDirection, idPat, idFonctionnalite);
        if(!liste.isEmpty()){
            verifier=true;
        }
        return verifier;
    }
}
