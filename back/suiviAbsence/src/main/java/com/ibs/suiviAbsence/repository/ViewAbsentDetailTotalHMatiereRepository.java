package com.ibs.suiviAbsence.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.suiviAbsence.modele.ViewAbsentDetailTotalHMatiere;


public interface ViewAbsentDetailTotalHMatiereRepository extends JpaRepository<ViewAbsentDetailTotalHMatiere, Integer>{

    List<ViewAbsentDetailTotalHMatiere> findAllByIdAnneeScolaire(Integer idAnneeScolaire);
    
}
