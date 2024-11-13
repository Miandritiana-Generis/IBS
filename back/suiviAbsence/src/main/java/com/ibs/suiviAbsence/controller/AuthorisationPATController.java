package com.ibs.suiviAbsence.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.suiviAbsence.service.AutorisationPatService;
import com.ibs.suiviAbsence.utilitaire.Constante;

@RestController
public class AuthorisationPATController {

    @Autowired
    public AutorisationPatService autorisationPatService;

    @GetMapping("/authorisationPAT")
    public ResponseEntity<Boolean> getAutho( @RequestParam(value = "id_pat", required = true) Integer idPat, @RequestParam(value = "id_direction", required = true) Integer idDirection)
    {
        return ResponseEntity.ok(autorisationPatService.estAutoriser(Constante.idFonctionaliteDash, idDirection, idPat));
    }
}
