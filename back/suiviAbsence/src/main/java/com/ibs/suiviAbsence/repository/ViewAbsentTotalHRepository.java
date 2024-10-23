package com.ibs.suiviAbsence.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibs.suiviAbsence.modele.ViewAbsentTotalH;


public interface ViewAbsentTotalHRepository extends JpaRepository<ViewAbsentTotalH, Integer>{

    // @Query(value = "SELECT * FROM v_liste_absent_total_h WHERE month_year = :month_year", nativeQuery = true)
    // Page<ViewAbsentTotalH> findByFilters(@Param("month_year") String monthYear, Pageable pageable);    
    List<ViewAbsentTotalH> findAllByIdAnneeScolaire(Integer idAnneeScolaire);
    
}
