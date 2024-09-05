package com.ibs.suiviAbsence.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.ibs.suiviAbsence.modele.Etudiant;

public interface EtudiantRepository  extends JpaRepository<Etudiant, Integer>{
    public Etudiant findByIdPersonne(int idPersonne);
}
