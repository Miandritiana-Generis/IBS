package com.ibs.suiviAbsence.dto;

import java.sql.Time;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PresenceInsertDTO {
    private int idEdt;
    private int idClasseEtudiant;
    private Time tempsArriver;
}
