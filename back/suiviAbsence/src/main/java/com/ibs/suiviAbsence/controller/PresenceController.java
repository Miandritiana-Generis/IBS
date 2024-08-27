package com.ibs.suiviAbsence.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.suiviAbsence.modele.DetailPresence;
import com.ibs.suiviAbsence.modele.V_InfoFichePresence;
import com.ibs.suiviAbsence.service.ViewEdtService;


@RestController
@RequestMapping("/presences")
public class PresenceController {

    @PostMapping
    public ResponseEntity insert(@RequestBody DetailPresence detailPresence){
        ResponseEntity reponse=null;

        return reponse;
    }
    @Autowired
    private ViewEdtService edtService;

    @GetMapping
    public ResponseEntity<List<V_InfoFichePresence>> getInfoFichePresence(
        @RequestParam("id_salle") int id_salle,
        @RequestParam(value = "date", required = false) String date,
        @RequestParam(value = "heure", required = false) String heure) {

    if (date == null || date.isEmpty()) {
        date = null;
    }
    if (heure == null || heure.isEmpty()) {
        heure = null;
    }

    List<V_InfoFichePresence> result = edtService.getInfoFichePresence(id_salle, heure, date);
    return ResponseEntity.ok(result);
}

}
