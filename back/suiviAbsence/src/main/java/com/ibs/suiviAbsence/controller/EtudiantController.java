/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.controller;

import com.ibs.suiviAbsence.modele.ViewClasseEtudiantAllInfo;
import com.ibs.suiviAbsence.repository.ViewClasseEtudiantAllInfoRepository;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author abc
 */
@RestController
@RequestMapping("/etudiants")
public class EtudiantController {
    @Autowired
    private ViewClasseEtudiantAllInfoRepository viewClasseEtudiantAllInfoRepository;
    @GetMapping("/prenom")
    public ResponseEntity getPrenomEtudiant(@RequestParam(value = "idClasseEtudiant", required = true)int idClasseEtudiant){
        String prenom;
        ViewClasseEtudiantAllInfo viewClasseEtudiantAllInfo=viewClasseEtudiantAllInfoRepository.findById(idClasseEtudiant).get();
        prenom= viewClasseEtudiantAllInfo!=null ? viewClasseEtudiantAllInfo.getPrenom():null;
        HashMap hashMap= new HashMap();
        hashMap.put("prenom", prenom);
        return ResponseEntity.ok(hashMap);
    }
    
}
