/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.service;

import com.ibs.suiviAbsence.exception.PersonneException;
import com.ibs.suiviAbsence.modele.ViewClasseEtudiant;
import com.ibs.suiviAbsence.modele.ViewEdtAllInfo;
import com.ibs.suiviAbsence.modele.ViewPersonneStatut;
import com.ibs.suiviAbsence.repository.ViewEdtAllInfoRepository;
import com.ibs.suiviAbsence.repository.ViewPersonneStatutRepository;
import com.ibs.suiviAbsence.utilitaire.Constante;
import java.sql.Date;
import java.util.ArrayList;
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
    @Autowired
    private AutorisationPatService autorisationPatService;
    @Autowired
    private EtudiantService etudiantService;
    public List<ViewEdtAllInfo> findEdt(String token,Date datedebut ,Date datefin){
        List<ViewEdtAllInfo> liste=new ArrayList<>();
        ViewPersonneStatut personne = viewPersonneStatutRepository.findPersonneByToken(token);
        if(personne==null){
            throw new PersonneException("Token invalide");
        }
        else if(personne.getIdEnseignant()>0){
            liste=viewEdtAllInfoRepository.findByIdEnseignant(personne.getIdEnseignant());
        } 
        else if(personne.getIdEtudiant()>0){
            ViewClasseEtudiant classeEtudiant= etudiantService.findClasseEtudiant(personne.getIdEtudiant());
            if(classeEtudiant!=null){
                liste=viewEdtAllInfoRepository.findAllByIdClasseAndDateBetween(classeEtudiant.getIdClasse(),datedebut,datefin);
            }
        }
        else if(personne.getIdPat()>0){
            if(this.autorisationPatService.estAutoriser(Constante.idFonctionaliteEdt, personne.getIdDirection(), personne.getIdPat())){
                liste=viewEdtAllInfoRepository.findAllByDateBetween(datedebut,datefin);
            }
        }
        return liste;
    }
    
}
