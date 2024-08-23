package com.ibs.suiviAbsence.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibs.suiviAbsence.modele.Edt;
import com.ibs.suiviAbsence.modele.Personne;
import com.ibs.suiviAbsence.repository.EdtRepository;
import com.ibs.suiviAbsence.repository.PersonneRepository;

@Service
public class EdtService {

    @Autowired
    private EdtRepository edtRepo;

    @Autowired
    private PersonneRepository personneRepo;
    

    public List<Edt> getEdt(int idPersonne) {
        List<Edt> edt = new ArrayList<>();
        List<Personne> pat = personneRepo.estPAT(idPersonne);
        List<Personne> enseignant = personneRepo.estEnseignant(idPersonne);
        List<Personne> etudiant = personneRepo.estEtudiant(idPersonne);
        if (pat != null) {
            edt = edtRepo.findAll();
        }
        else if (enseignant != null) {
            edt = edtRepo.getEdtEnseignant(idPersonne);
        }
        else if (etudiant != null) {
            edt = edtRepo.getEdtDelegue(idPersonne);
        }
        return edt;
    }


}
