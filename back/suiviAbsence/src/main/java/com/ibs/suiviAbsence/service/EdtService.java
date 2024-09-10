/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.service;

import com.ibs.suiviAbsence.exception.EdtException;
import com.ibs.suiviAbsence.exception.PersonneException;
import com.ibs.suiviAbsence.modele.Edt;
import com.ibs.suiviAbsence.modele.ViewClasseEtudiant;
import com.ibs.suiviAbsence.modele.ViewClasseEtudiantAllInfo;
import com.ibs.suiviAbsence.modele.ViewEdtAllInfo;
import com.ibs.suiviAbsence.modele.ViewLogin;
import com.ibs.suiviAbsence.modele.ViewPresenceAbsence;
import com.ibs.suiviAbsence.repository.EdtRepository;
import com.ibs.suiviAbsence.repository.ViewEdtAllInfoRepository;
import com.ibs.suiviAbsence.repository.ViewLoginRepository;
import com.ibs.suiviAbsence.repository.ViewPresenceAbsenceRepository;
import com.ibs.suiviAbsence.utilitaire.Constante;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author abc
 */
@Service
public class EdtService {
    @Autowired
    private ViewEdtAllInfoRepository viewEdtAllInfoRepository;
    @Autowired
    private ViewLoginRepository loginRepository;
    @Autowired
    private AutorisationPatService autorisationPatService;
    @Autowired
    private EtudiantService etudiantService;
    @Autowired
    private EdtRepository edtRepository;
    @Autowired 
    private NotificationService notificationService;
    
    public List<ViewEdtAllInfo> findEdt(String token,Date datedebut ,Date datefin){
        List<ViewEdtAllInfo> liste=new ArrayList<>();
        ViewLogin personne = loginRepository.findLoginByToken(token);
        if(personne==null){
            throw new PersonneException("Token invalide");
        }
        else if(personne.getIdEnseignant()>0){
            liste=viewEdtAllInfoRepository.findByIdEnseignantAndDateBetween(personne.getIdEnseignant(),datedebut,datefin);
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
    
    @Transactional(rollbackFor = Exception.class)
    public void annulerCours(String token ,int idEdt){
        ViewLogin personne = loginRepository.findLoginByToken(token);
        if(personne==null){
            throw new PersonneException("Token invalide");
        }
        else if(personne.getIdEnseignant()>0){
            Optional<Edt> optional=this.edtRepository.findById(idEdt) ;
            if(optional.isEmpty()){
                throw new EdtException("L'employe du temps n'existe pas ");
            }
            Edt edt= optional.get();
            if(edt.isEstAnnule()){
                throw new EdtException("Ce cours est déjà annulé");
            }
            long difference =edt.getDate().getTime()-new Date(System.currentTimeMillis()).getTime();

            long endHeure= (difference/3600000);

            if(endHeure<48){
                throw new EdtException("Ce cours ne peut plus etre annulé");
            }
            edt.setEstAnnule(true);
            this.edtRepository.save(edt);
            String contenue="Cours annulé";
            this.notificationService.genererNotification(edt.getId(),contenue,Constante.coursAnnule);
        }
        else{
            throw new EdtException("Vous n'avez par le droit d'annulé un cours");
        }
    }
    
}
