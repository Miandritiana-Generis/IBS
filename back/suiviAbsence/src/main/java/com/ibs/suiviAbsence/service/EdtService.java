/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.service;

import com.ibs.suiviAbsence.exception.PersonneException;
import com.ibs.suiviAbsence.modele.Edt;
import com.ibs.suiviAbsence.modele.Personne;
import com.ibs.suiviAbsence.modele.ViewEdtAllInfo;
import com.ibs.suiviAbsence.modele.ViewPersonneStatut;
import com.ibs.suiviAbsence.repository.EdtRepository;
import com.ibs.suiviAbsence.repository.ViewEdtAllInfoRepository;
import com.ibs.suiviAbsence.repository.ViewPersonneStatutRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author abc
 */
@Service
public class EdtService {
    @Autowired
    private ViewEdtAllInfoRepository viewEdtAllInfoRepository;
    @Autowired
    private ViewPersonneStatutRepository viewPersonneStatutRepository;
    
    public List<ViewEdtAllInfo> findEdt(String token){
        List<ViewEdtAllInfo> liste=null;
        ViewPersonneStatut personne = viewPersonneStatutRepository.findPersonneByToken(token);
        if(personne==null){
            throw new PersonneException("Token invalide");
        }
        if(personne.getIdPat()>0){
            liste=viewEdtAllInfoRepository.findAll();
        }
        else if(personne.getIdEnseignant()>0){
            liste=viewEdtAllInfoRepository.findByIdEnseignant(personne.getIdEnseignant());
        }
        else if(personne.getIdEnseignant()>0){
            
        }
        return liste;
    }
    
}
