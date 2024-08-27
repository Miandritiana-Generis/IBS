package com.ibs.suiviAbsence.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("presences")
public class PresenceController {

    @PostMapping
    public ResponseEntity insert(@RequestBody ){
        ResponseEntity reponse=null;

        return reponse;
    }
}
