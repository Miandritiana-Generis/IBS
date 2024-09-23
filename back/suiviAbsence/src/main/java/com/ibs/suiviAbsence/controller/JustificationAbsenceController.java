package com.ibs.suiviAbsence.controller;

import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.suiviAbsence.modele.JustificationAbsence;
import com.ibs.suiviAbsence.repository.JustificationAbsenceRepository;
import com.ibs.suiviAbsence.utilitaire.FonctionUtil;

@RestController
@RequestMapping("/justification")
public class JustificationAbsenceController {

     @Autowired
    private JustificationAbsenceRepository justificationAbsenceRepository;

    @PostMapping
    public ResponseEntity<?> justify(@RequestBody JustificationAbsence justification) {
        justificationAbsenceRepository.save(justification);
        Map<String, String> response = new HashMap<>();
        String message = "justification saved";
        response.put("message", message);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


  
}
