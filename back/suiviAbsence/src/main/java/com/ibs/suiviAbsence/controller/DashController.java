package com.ibs.suiviAbsence.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.suiviAbsence.modele.ViewClasseDetail;
import com.ibs.suiviAbsence.service.DashService;

@RestController
public class DashController {

    @Autowired
    DashService dashService;

    @GetMapping("/liste-classe")
    public ResponseEntity<List<ViewClasseDetail>> getListeClassse()
    {
        List<ViewClasseDetail> listeClasse = dashService.findViewClasseDetails();
        return ResponseEntity.ok(listeClasse);
    }
}