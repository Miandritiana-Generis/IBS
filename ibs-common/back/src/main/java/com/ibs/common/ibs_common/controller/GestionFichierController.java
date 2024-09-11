package com.ibs.common.ibs_common.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.common.ibs_common.model.gestionFichier.OCAccountsData;
import com.ibs.common.ibs_common.model.gestionFichier.VOcShare;
import com.ibs.common.ibs_common.repository.gestionFichier.OCAccountsDataRepository;
import com.ibs.common.ibs_common.repository.gestionFichier.VOcShareRepository;

//@RestController
public class GestionFichierController {

//    @Autowired
//    VOcShareRepository vOcShareRepository;
//
//
//    @Autowired
//    OCAccountsDataRepository ocAccountsDataRepository;
//
//    @Autowired
//    VOcShareRepository ocShareRepository;

//    @GetMapping("/find")
//    public Object find(){
//        return vOcShareRepository.findAll();
//    }

//    @GetMapping("/mail")
//    public Object mail(){
//        List<OCAccountsData> liste = ocAccountsDataRepository.getMailUsers();
//        return liste;
//    }

//    @GetMapping("/expiration")
//    public Object expirationListe(){
//        List<VOcShare> shareList = ocShareRepository.getExpirationPasEncoreEnvoyé();
//        return shareList;
//    }





}
