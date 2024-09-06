package com.ibs.suiviAbsence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.suiviAbsence.modele.ClasseEtudiant;

public interface ClasseEtudiantRepository  extends JpaRepository<ClasseEtudiant,Integer>{
    public ClasseEtudiant findByIdEtudiant(int idEtudiant);

}
