package com.ibs.suiviAbsence.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.suiviAbsence.modele.ViewAbsentTotalH;


public interface ViewAbsentTotalHRepository extends JpaRepository<ViewAbsentTotalH, Integer>{

    // @Query(value = "SELECT * FROM v_liste_absent_total_h WHERE month_year = :month_year", nativeQuery = true)
    Page<ViewAbsentTotalH> findByIdAnneeScolaire(int idAnneeScolaire, Pageable pageable);    
    List<ViewAbsentTotalH> findAllByIdAnneeScolaire(Integer idAnneeScolaire);
    
}
