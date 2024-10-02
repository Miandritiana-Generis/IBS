package com.ibs.suiviAbsence.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.suiviAbsence.modele.ClasseEtudiant;

public interface ClasseEtudiantRepository  extends JpaRepository<ClasseEtudiant,Integer>{
    public List<ClasseEtudiant> findByIdEtudiant(int idEtudiant);

}
