package com.ibs.suiviAbsence.service;

import com.ibs.suiviAbsence.exception.PresenceException;
import com.ibs.suiviAbsence.modele.ClasseEtudiant;
import com.ibs.suiviAbsence.modele.DetailPresence;
import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Optional;

import javax.management.Notification;

import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibs.suiviAbsence.exception.PresenceException;
import com.ibs.suiviAbsence.modele.Edt;
import com.ibs.suiviAbsence.modele.Etudiant;
import com.ibs.suiviAbsence.modele.JustificationAbsence;
import com.ibs.suiviAbsence.modele.NotificationEdt;
import com.ibs.suiviAbsence.modele.Personne;
import com.ibs.suiviAbsence.modele.Presence;
import com.ibs.suiviAbsence.modele.Token;
import com.ibs.suiviAbsence.modele.ViewEdtAllInfo;
import com.ibs.suiviAbsence.modele.ViewLogin;
import com.ibs.suiviAbsence.modele.ViewPresenceAbsence;
import com.ibs.suiviAbsence.repository.EdtRepository;
import com.ibs.suiviAbsence.repository.EtudiantRepository;
import com.ibs.suiviAbsence.repository.NotificationEdtRepository;
import com.ibs.suiviAbsence.repository.PersonneRepository;
import com.ibs.suiviAbsence.repository.ClasseEtudiantRepository;
import com.ibs.suiviAbsence.repository.DetailPresenceRepository;
import com.ibs.suiviAbsence.repository.PresenceRepository;
import com.ibs.suiviAbsence.repository.TokenRepository;
import com.ibs.suiviAbsence.repository.ViewEdtAllInfoRepository;
import com.ibs.suiviAbsence.repository.ViewLoginRepository;
import com.ibs.suiviAbsence.repository.ViewPresenceAbsenceRepository;
import com.ibs.suiviAbsence.utilitaire.Constante;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class PresenceService {
    @Autowired
    ViewEdtAllInfoRepository viewEdtAllInfoRepository;
    @Autowired
    PresenceRepository presenceRepository;
    @Autowired
    EdtRepository edtRepository;
    @Autowired
    TokenRepository token;
    @Autowired
    PersonneRepository personneRepo;
    @Autowired
    EtudiantRepository etudiantRepo;
    @Autowired
    ClasseEtudiantRepository classeEtudiant;
    @Autowired
    private ViewLoginRepository loginRepository;
    @Autowired
    private ViewPresenceAbsenceRepository viewPresenceAbsenceRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private ClasseEtudiantRepository classeEtudiantRepository;


     public List<ViewPresenceAbsence> listeEtudiantAbsent(Date date1,Date date2){
        List<ViewPresenceAbsence> liste=this.viewPresenceAbsenceRepository.findByDateBetweenAndIsPresent(date1, date2,false);
        return liste;
     }
     
    
    public Page<ViewPresenceAbsence> listeEtudiantAbsent(Date date1,Date date2,int page){
        int nombreParPage=25;
        Sort sort = Sort.by(Sort.Order.desc("date"));
        Pageable pageable = PageRequest.of(page-1, nombreParPage,sort);
        Page<ViewPresenceAbsence> liste=this.viewPresenceAbsenceRepository.findByDateBetweenAndIsPresent(date1, date2,false,pageable);
        return liste;
    }
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
        Optional<ClasseEtudiant> etudiant =  this.classeEtudiant.findById(idClasseEtudiant);
        if(etudiant.isEmpty()){
            throw new PresenceException("L'etudiant n'est pas valide");
        }
        
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

    /**
     * Ce metier permet de valider le fiche de presence en tant que prof mais ne fiche ne doit être
     * validable que 30 min après le cours
     * @param tokenValue
     * @param idEdt
     */
    public void validerProf(Integer idEdt, String tokenValue) {
        System.out.println("Validation du professeur avec idEdt: " + idEdt + " et tokenValue: " + tokenValue);
        
        Optional<Edt> edt = edtRepository.findById(idEdt);      
        if (idEdt == null) {
            throw new PresenceException("L'emploi du temps n'existe pas");
        }  
        
        if (edt.isPresent() && this.estProf(tokenValue)) {
            Time heureDebut = edt.get().getDebut();
            Time heureFin = edt.get().getFin();
            LocalTime currentTime = LocalTime.now();
            LocalTime debutLocalTime = heureDebut.toLocalTime();
            LocalTime finLocalTime = heureFin.toLocalTime();            
            LocalTime debutPlus30Min = debutLocalTime.plusMinutes(30);
    
            System.out.println("Heure actuelle: " + currentTime);
            System.out.println("Heure de début ajustée: " + debutPlus30Min + ", Heure de fin: " + finLocalTime);
    
            if (currentTime.isAfter(debutPlus30Min) && currentTime.isBefore(finLocalTime)) {
                presenceRepository.validerFichePresence(idEdt);
            } else {
                throw new PresenceException("L'heure actuelle n'est pas entre l'heure de début ajustée et l'heure de fin.");
            }
        } else if (!this.estProf(tokenValue)) {
            throw new PresenceException("Vous n'êtes pas autorisé à effectuer cette action");
        } else {
            throw new PresenceException("Aucune entrée trouvée pour l'ID fourni.");
        }
    }
    

    /**
     * Cette metier permet de valider le fiche de presence en tant que prof mais ne fiche ne doit être
     * validable que 30 min après le cours
     * @param idSalle
     * @param idEdt
     * @return
     */
    public void validerDelegue(Integer idEdt, String tokenValue) {
        Optional<Presence> presence = presenceRepository.findByIdEdt(idEdt);
    
      
        if (presence.isEmpty()) {
            System.out.println("aaaaaa");
            throw new PresenceException("La fiche de présence avec l'ID fourni n'existe pas.");
        }
    
        Presence presenceObj = presence.get();
        int nbAbsent = viewPresenceAbsenceRepository.countAbsence(idEdt);
    
        
        if (presenceObj.getValideProf() == 1 && this.estDelegue(tokenValue)) {
            System.out.println("bbbbbbbb");
            presenceRepository.validerFichePresenceDelegue(idEdt);
    
            
            if (nbAbsent > 0) {
                System.out.println("cccccccc");
                String contenu = "Absence de " + nbAbsent + " étudiants.";
                this.notificationService.genererNotification(idEdt, contenu, Constante.coursAnnule);
            }
        } else {
            System.out.println("ddddddd");
            throw new PresenceException("Vous ne pouvez pas valider la fiche de présence.");
        }
    }
    

    // public boolean estDelegue(String tokenValue) {
    //     Token tok = token.findByToken(tokenValue);
    //     Optional<Personne> p = personneRepo.findById(tok.getId_personne());
    //     Etudiant et = etudiantRepo.findByIdPersonne(p.get().getId());
    //     ClasseEtudiant classe = classeEtudiant.findByIdEtudiant(et.getId());
    //     if(classe.getEst_delegue() == 1) {
    //         return true;
    //     }
    //     return false;
    // }

    public boolean estDelegue(String tokenValue) {
        //System.out.println("id: "+ String.valueOf(tokenValue));
        boolean retour = false;
        ViewLogin v = loginRepository.findLoginByToken(tokenValue);
        
    
        
        if (v == null) {
            System.out.println("Le token n'a pas été trouvé.");
            return false;  
        }
    
        if (v.getIdEtudiant() != 0) {
            ClasseEtudiant cl = classeEtudiantRepository.findByIdEtudiant(v.getIdEtudiant());
            if(cl.getEst_delegue()==1){
                retour = true;
            }
            
        }

        return retour;
    }


    public boolean estProf(String tokenValue) {
        boolean retour = false;
        ViewLogin v = loginRepository.findLoginByToken(tokenValue);
    
        
        if (v == null) {
            System.out.println("Le token n'a pas été trouvé.");
            return false;  
        }
    
        if (v.getIdEnseignant() != 0) {
            retour = true;
        }
        return retour;
    }
    

   



}


