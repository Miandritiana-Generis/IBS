package com.ibs.suiviAbsence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibs.suiviAbsence.modele.Edt;

public interface EdtRepository extends JpaRepository<Edt, Integer>{
    @Query("select e from Edt e where e.idSalle=:idSalle")
    public List<Edt> findAllByIdSalle(@Param("idSalle") int idSalle);
}
