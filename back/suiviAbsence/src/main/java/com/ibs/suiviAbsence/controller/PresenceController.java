package com.ibs.suiviAbsence.controller;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;
import java.time.LocalTime;
import java.sql.Time;

import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.ibs.suiviAbsence.repository.DetailPresenceRepository;
import com.ibs.suiviAbsence.repository.PresenceRepository;
import com.ibs.suiviAbsence.repository.V_InfoFichePresenceRepository;
import com.ibs.suiviAbsence.service.PresenceService;


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

    @GetMapping
    public ResponseEntity<Map<String, Object>> getInfoFichePresence(
    @RequestParam(value = "id_salle", required = false) Integer idSalle,
    @RequestParam(value = "date", required = false) String date,
    @RequestParam(value = "heure", required = false) String heure,
    @RequestParam(value = "id_edt", required = false) Integer idEdt) {

    List<V_InfoFichePresence> result;
    boolean retour = false;

    if (idEdt != null) {
        result = v_InfoFichePresence.getInfoFichePresenceWithEdt(idEdt);
        Optional<Presence> p = presenceRepository.findByIdEdt(idEdt);
        if(p.get().getValideProf()==1){
            Time heureDebut = result.get(0).getDebut();
            Time heureFin = result.get(0).getFin();
            LocalTime debutLocalTime = heureDebut.toLocalTime();
            LocalTime finLocalTime = heureFin.toLocalTime();
            LocalTime currentTime = LocalTime.now();
            if(currentTime.isBefore(debutLocalTime)==true || currentTime.isAfter(finLocalTime)==true){
                retour = true;
            }
            
        }

    } else if (idSalle != null) {
        if (date == null || date.isEmpty()) {
            date = null;
        }
        if (heure == null || heure.isEmpty()) {
            heure = null;
        }
        result = edtService.getInfoFichePresence(idSalle, heure, date);
    } else {
        return ResponseEntity.badRequest().body(null); // Si ni id_salle ni id_edt n'est fourni
    }
    Map<String, Object> response = new HashMap<>();
    response.put("data", result);
    response.put("retour", retour);

    return ResponseEntity.ok(response);
}

    

    @GetMapping("today")
    public ResponseEntity<List<V_InfoFichePresence>> getInfoFichePresenceToday(
        @RequestParam("id_salle") int id_salle,
        @RequestParam(value = "date", required = false) String date) {

    if (date == null || date.isEmpty()) {
        date = null;
    }

    List<V_InfoFichePresence> result = edtService.getInfoFichePresenceToday(id_salle, date);
    return ResponseEntity.ok(result);
    }


    @PutMapping("validerProf")
    public ResponseEntity validerProf(@RequestParam int idEdt) {
        
            presenceService.validerProf(idEdt);

            return ResponseEntity.ok("Validation effectuée pour idEdt : " + idEdt);
       
    }

    @PutMapping("validerDelegue")
    public ResponseEntity validerDelegue(@RequestParam int idEdt, @RequestHeader("Authorization") String tokenValue) {
        
            presenceService.validerDelegue(idEdt,tokenValue);

            return ResponseEntity.ok("Validation effectuée pour idEdt : " + idEdt);
        
    }
    





}
