package com.ibs.suiviAbsence.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.suiviAbsence.modele.Edt;
import com.ibs.suiviAbsence.service.EdtService;

@RestController
public class EdtController {
    @Autowired
    EdtService edtService;

    

    @GetMapping("/liste-edt")
    public ResponseEntity<List<Edt>> getListeEdt(@RequestParam(value = "id_personne", required = true) int id_personne) {
    List<Edt> edtList = edtService.getEdt(id_personne);
    return ResponseEntity.ok(edtList);
}
}
