package com.ibs.suiviAbsence.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.suiviAbsence.modele.DetailPresence;


@RestController
@RequestMapping("presences")
public class PresenceController {

    @PostMapping
    public ResponseEntity insert(@RequestBody DetailPresence detailPresence){
        ResponseEntity reponse=null;

        return reponse;
    }
}
