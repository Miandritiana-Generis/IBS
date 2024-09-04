package com.ibs.suiviAbsence.service;

import com.ibs.suiviAbsence.exception.PresenceException;
import com.ibs.suiviAbsence.modele.DetailPresence;
import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibs.suiviAbsence.modele.Presence;
import com.ibs.suiviAbsence.modele.ViewEdtAllInfo;
import com.ibs.suiviAbsence.repository.DetailPresenceRepository;
import com.ibs.suiviAbsence.repository.PresenceRepository;
import com.ibs.suiviAbsence.repository.ViewEdtAllInfoRepository;

@Service
public class PresenceService {
    @Autowired
    ViewEdtAllInfoRepository viewEdtAllInfoRepository;
    @Autowired
    PresenceRepository presenceRepository;
    @Autowired
    DetailPresenceRepository detailPresenceRepository;
    
    public Presence recupererPresence(int idEdt){
        Presence presence=presenceRepository.findAllByIdEdt(idEdt);
        if(presence==null){
            presence=new Presence();
            presence.setIdEdt(idEdt);
            presence=presenceRepository.save(presence);
        }
        return presence;
    }
    
    public void controlleInsertPrensence(int idPresence,int idClasseEtudiant){
        List<DetailPresence> detailPresence=detailPresenceRepository.findByIdPresenceAndIdClasseEtudiant(idPresence, idClasseEtudiant);
        if(!detailPresence.isEmpty()) throw new PresenceException("Pointage deja effectuer pour cette etudiant");
    }
    
    /**
     * Cette metier permet de recuperer l'employe du temps d'un salle a la date et heure courant si l'idt est 0
     * sinon elle recuperer l'enploye du temps de ID
     * @param idSalle
     * @param idEdt
     * @return
     */
    public ViewEdtAllInfo getInfoEdt(int idSalle,int idEdt){
        ViewEdtAllInfo edt=null;
        if(idEdt!=0){
            Optional<ViewEdtAllInfo> optional=viewEdtAllInfoRepository.findById(idEdt);
            if(optional.isPresent()){
                edt=viewEdtAllInfoRepository.findById(idEdt).get();
            }
            
        }
        else{
            long currentTimeMillis=System.currentTimeMillis();
            Date date= new Date(currentTimeMillis);
            Time time = new Time(currentTimeMillis);
            
            List<ViewEdtAllInfo> liste= viewEdtAllInfoRepository.findAllByIdSalle(idSalle, date, time);
            if(!liste.isEmpty()){
                edt=liste.get(0);
            }
        }
        return edt;
    }

}
