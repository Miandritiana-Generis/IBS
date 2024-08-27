package com.ibs.suiviAbsence.service;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibs.suiviAbsence.modele.ViewEdt;
import com.ibs.suiviAbsence.modele.Personne;
import com.ibs.suiviAbsence.repository.ViewEdtRepository;
import com.ibs.suiviAbsence.repository.PersonneRepository;

@Service
public class ViewEdtService {

    @Autowired
    private ViewEdtRepository ViewEdtRepo;

    @Autowired
    private PersonneRepository personneRepo;
    
    public ViewEdt findEdtCourant(int idSalle,Date datedonner,Time time) {
        ViewEdt ViewEdt=null;
        System.out.println("date---------------------------------"+datedonner);

        List<ViewEdt> listes = ViewEdtRepo.findByIdSalle(idSalle);
        if(!listes.isEmpty()){
            ViewEdt=listes.get(0);
        }
        return ViewEdt;
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
