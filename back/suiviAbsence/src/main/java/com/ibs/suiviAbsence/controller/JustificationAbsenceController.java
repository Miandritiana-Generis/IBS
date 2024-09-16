package com.ibs.suiviAbsence.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.suiviAbsence.modele.JustificationAbsence;
import com.ibs.suiviAbsence.repository.JustificationAbsenceRepository;

@RestController
@RequestMapping("/justification")
public class JustificationAbsenceController {

     @Autowired
    private JustificationAbsenceRepository justificationAbsenceRepository;

    @PostMapping
    public ResponseEntity<?> justify(@RequestBody JustificationAbsence justification) {
        justificationAbsenceRepository.save(justification);
        return ResponseEntity.ok("Justification saved successfully");
    }
}
