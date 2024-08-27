package com.ibs.suiviAbsence.service;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibs.suiviAbsence.modele.ViewEdt;
import com.ibs.suiviAbsence.modele.Edt;
import com.ibs.suiviAbsence.modele.Personne;
import com.ibs.suiviAbsence.repository.ViewEdtRepository;
import com.ibs.suiviAbsence.repository.EdtRepository;
import com.ibs.suiviAbsence.repository.PersonneRepository;

@Service
public class ViewEdtService {

    @Autowired
    private ViewEdtRepository ViewEdtRepo;

    @Autowired
    private PersonneRepository personneRepo;
    @Autowired
    private EdtRepository edtRepository;
    
    public Edt findEdtCourant(int idSalle,Date datedonner,Time time) {
        Edt viewEdt=null;

        List<Edt> listes = edtRepository.findAllByIdSalle(idSalle);
        if(!listes.isEmpty()){
            viewEdt=listes.get(0);
        }
        return viewEdt;
    }

    /**
     * cette methode permet d'afficher la liste des emplois du temps
     * @param id_personne
     * @return
     */
    public List<ViewEdt> getEdt(int idPersonne) {
        List<ViewEdt> ViewEdt = new ArrayList<>();
        List<Personne> pat = personneRepo.estPAT(idPersonne);
        List<Personne> enseignant = personneRepo.estEnseignant(idPersonne);
        List<Personne> etudiant = personneRepo.estEtudiant(idPersonne);
        if (pat != null) {
            ViewEdt = ViewEdtRepo.findAll();
        }
        else if (enseignant != null) {
            ViewEdt = ViewEdtRepo.getEdtEnseignant(idPersonne);
        }
        else if (etudiant != null) {
            ViewEdt = ViewEdtRepo.getEdtDelegue(idPersonne);
        }
        return ViewEdt;
    }

}
