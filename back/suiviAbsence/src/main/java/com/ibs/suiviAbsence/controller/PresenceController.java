package com.ibs.suiviAbsence.controller;

import java.util.List;
import java.util.Optional;
import java.time.LocalTime;
import java.sql.Time;

import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.suiviAbsence.dto.PresenceInsertDTO;
import com.ibs.suiviAbsence.modele.DetailPresence;
import com.ibs.suiviAbsence.modele.V_InfoFichePresence;
import com.ibs.suiviAbsence.service.ViewEdtService;
import com.ibs.suiviAbsence.modele.Presence;
import com.ibs.suiviAbsence.modele.ViewPresenceAbsence;
import com.ibs.suiviAbsence.repository.DetailPresenceRepository;
import com.ibs.suiviAbsence.repository.PresenceRepository;
import com.ibs.suiviAbsence.repository.V_InfoFichePresenceRepository;
import com.ibs.suiviAbsence.service.PresenceService;
import java.sql.Date;
import org.springframework.data.domain.Page;


@RestController
@RequestMapping("/presences")
public class PresenceController {
    @Autowired
    PresenceService presenceService;
    @Autowired
    DetailPresenceRepository detailPresenceRepository;
    @Autowired
    V_InfoFichePresenceRepository v_InfoFichePresence;
    @Autowired
    PresenceRepository presenceRepository;
    
    @PostMapping
    public ResponseEntity insert(@RequestBody PresenceInsertDTO presenceInsertDTO){
        //recupererPresence
        Presence presence= presenceService.recupererPresence(presenceInsertDTO.getIdEdt());
        //Controlle de valeur,
        presenceService.controlleInsertPrensence(presence.getId(), presenceInsertDTO.getIdClasseEtudiant());
        //insertPrensenceDetail
        DetailPresence detailPresence= new DetailPresence(presence.getId(),presenceInsertDTO.getIdClasseEtudiant(),presenceInsertDTO.getTempsArriver());
        detailPresence=detailPresenceRepository.save(detailPresence);
        return ResponseEntity.ok(detailPresence);
    }
    @Autowired
    private ViewEdtService edtService;

    /**
     * Cette methode permet de lister les etudiant dans une classe à un jour 
     * @param idSalle
     * @param date
     * @param heure
     * @param idEdt
     * @return
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getInfoFichePresence(
    @RequestParam(value = "id_salle", required = false) Integer idSalle,
    @RequestParam(value = "date", required = false) String date,
    @RequestParam(value = "heure", required = false) String heure,
    @RequestParam(value = "id_edt", required = false) Integer idEdt) {

    List<V_InfoFichePresence> result;
    boolean retour = false;
    Optional<Presence> p;
    String stringRetour = "ValideProf = 0;" + "ValideDelegue = 0";

    if (idEdt != null) {
        result = v_InfoFichePresence.getInfoFichePresenceWithEdt(idEdt);
        p = presenceRepository.findByIdEdt(idEdt);
        if(p.isPresent() && p.get().getValideProf()==1 && p.get().getValideDelegue()==0){
            stringRetour = "ValideProf = 1;" + "ValideDelegue = 0";
            Time heureDebut = result.get(0).getDebut();
            Time heureFin = result.get(0).getFin();
            LocalTime debutLocalTime = heureDebut.toLocalTime();
            LocalTime finLocalTime = heureFin.toLocalTime();
            LocalTime currentTime = LocalTime.now();
            if(currentTime.isBefore(debutLocalTime)==true || currentTime.isAfter(finLocalTime)==true){
                retour = true;
                stringRetour = "ValideProf = 1;" + "ValideDelegue = 0";
            }
            
        }
        else if(p.isPresent() && p.get().getValideProf()==1 && p.get().getValideDelegue()==1){
            stringRetour = "ValideProf = 1;" + "ValideDelegue = 1";
            Time heureDebut = result.get(0).getDebut();
            Time heureFin = result.get(0).getFin();
            LocalTime debutLocalTime = heureDebut.toLocalTime();
            LocalTime finLocalTime = heureFin.toLocalTime();
            LocalTime currentTime = LocalTime.now();
            if(currentTime.isBefore(debutLocalTime)==true || currentTime.isAfter(finLocalTime)==true){
                retour = true;
                stringRetour = "ValideProf = 1;" + "ValideDelegue = 1";
            }
            
        }

    } 
    else if (idSalle != null) {
        if (date == null || date.isEmpty()) {
            date = null;
        }
        if (heure == null || heure.isEmpty()) {
            heure = null;
        }
        result = edtService.getInfoFichePresence(idSalle, heure, date);
        p =  presenceRepository.findByIdEdt(result.get(0).getId_edt());
        if (p.isPresent() && p.get().getValideProf()==1 && p.get().getValideDelegue()==0){
            retour = true;
            stringRetour = "ValideProf = 1;" + "ValideDelegue = 0";
        }
        else if (p.isPresent() && p.get().getValideProf()==1 && p.get().getValideDelegue()==1){
            retour = true;
            stringRetour = "ValideProf = 1;" + "ValideDelegue = 1";
        }
    }
    else {
        return ResponseEntity.badRequest().body(null); // Si ni id_salle ni id_edt n'est fourni
    }
    Map<String, Object> response = new HashMap<>();
    response.put("data", result);
    response.put("retour", stringRetour);

    return ResponseEntity.ok(response);
    }

    @GetMapping("/estAnnule")
    public ResponseEntity<Map<String, Boolean>> estAnnule(@RequestParam Integer idEdt) {
        boolean estAnnule = edtService.estAnnule(idEdt);
        // Préparer la réponse en format JSON
        Map<String, Boolean> response = new HashMap<>();
        response.put("estAnnule", estAnnule);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/estValideProf")
    public ResponseEntity<Map<String, Boolean>> estValideProf(@RequestParam Integer idEdt) {
        
        Optional<Presence> p = presenceRepository.findByIdEdt(idEdt);
        boolean retour = false;
        if(p.get().getValideProf() == 1){
            retour = true;
        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("prof", retour);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/estValideDelegue")
    public ResponseEntity<Map<String, Boolean>> estValideDelegue(@RequestParam Integer idEdt) {
        Optional<Presence> p = presenceRepository.findByIdEdt(idEdt);
        boolean retour = false;
        if(p.get().getValideDelegue() == 1){
            retour = true;
        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("delegue", retour);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/estProf")
    public ResponseEntity<Map<String, Boolean>> estProf(@RequestHeader("Authorization") String tokenValue) {
        boolean estProf = presenceService.estProf(tokenValue);

        Map<String, Boolean> response = new HashMap<>();
        response.put("estAnnule", estProf);

        return ResponseEntity.ok(response);
    }



    
    

    @GetMapping("/today")
    public ResponseEntity<List<V_InfoFichePresence>> getInfoFichePresenceToday(
        @RequestParam("id_salle") int id_salle,
        @RequestParam(value = "date", required = false) String date) {

    if (date == null || date.isEmpty()) {
        date = null;
    }

    List<V_InfoFichePresence> result = edtService.getInfoFichePresenceToday(id_salle, date);
    return ResponseEntity.ok(result);
    }


    @PutMapping("/validerProf")
    public ResponseEntity<Map<String, String>> validerProf(@RequestParam int idEdt,@RequestHeader("Authorization") String tokenValue) {
        presenceService.validerProf(idEdt,tokenValue);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Validation effectuée pour idEdt : " + idEdt);
        
        return ResponseEntity.ok(response);
    }

    @PutMapping("/validerDelegue")
    public ResponseEntity<Map<String, String>> validerDelegue(
            @RequestParam int idEdt, 
            @RequestHeader("Authorization") String tokenValue) {
    
        presenceService.validerDelegue(idEdt, tokenValue);
    
        Map<String, String> response = new HashMap<>();
        response.put("message", "Validation effectuée pour idEdt : " + idEdt);
    
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/absents")
    public ResponseEntity getEtudiantAbsent(@RequestHeader(value = "Authorization", required = true)String authorizationHeader,
        @RequestParam(name = "dateDebut")  Date dateDebut, 
        @RequestParam(name = "dateFin")  Date datefin,
        @RequestParam(value = "page", required = false ,defaultValue = "1")   int page){
        Page<ViewPresenceAbsence>liste=this.presenceService.listeEtudiantAbsent(dateDebut,datefin,page);
        return ResponseEntity.ok(liste);
    }




}
