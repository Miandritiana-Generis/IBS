package com.ibs.suiviAbsence.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.suiviAbsence.modele.Edt;
import com.ibs.suiviAbsence.modele.Salle;
import com.ibs.suiviAbsence.repository.EdtRepository;
import com.ibs.suiviAbsence.repository.SalleRepository;
import com.ibs.suiviAbsence.service.EdtService;

@RestController
public class EdtController {
    @Autowired
    EdtService edtService;

    @Autowired
    EdtRepository edtRepo;

    @Autowired
    SalleRepository salleRepo;

    
    /**
     * cette methode permet d'afficher la liste des emplois du temps
     * @param id_personne
     * @return
     */
    @GetMapping("/liste-edt")
    public ResponseEntity<List<Edt>> getListeEdt(@RequestParam(value = "id_personne", required = true) int id_personne) {
    List<Edt> edtList = edtService.getEdt(id_personne);
    return ResponseEntity.ok(edtList);

   }

   @GetMapping("/detail-edt")
   public ResponseEntity<Edt> getDetailEdt(@RequestParam(value = "id_edt", required = true) int id_edt) {
       Optional<Edt> optionalEdt = edtRepo.findById(id_edt);  
       if (optionalEdt.isPresent()) {
           return ResponseEntity.ok(optionalEdt.get());  
       } else {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  
       }
   }

   @GetMapping("/liste-salle")
   public ResponseEntity<List<Salle>> getListeSalle() {
     List<Salle> salles = salleRepo.findAll(); // Récupérer la liste des personnes
    return ResponseEntity.ok(salles);
   }
}
