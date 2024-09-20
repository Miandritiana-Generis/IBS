package com.ibs.suiviAbsence.repository;

import com.ibs.suiviAbsence.modele.ViewTauxAbsencePresence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ViewTauxAbsencePresenceRepository extends JpaRepository<ViewTauxAbsencePresence, Integer> {

    @Query(value = "SELECT * FROM get_taux_absence_presence(:month_year, :id_classe, :id_niveau)", nativeQuery = true)
    List<ViewTauxAbsencePresence> findByFilters(
        @Param("month_year") String monthYear,
        @Param("id_classe") Integer idClasse,
        @Param("id_niveau") Integer idNiveau
    );
}
