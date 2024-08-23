package com.ibs.suiviAbsence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibs.suiviAbsence.modele.Personne;

public interface PersonneRepository extends JpaRepository<Personne, Integer> {

    @Query(value = "SELECT * from personne where id in (select id_personne from pat where id_personne = :id_personne)", nativeQuery = true)
    public List<Personne> estPAT(@Param("id_personne") int id_personne);

    @Query(value = "SELECT * from personne where id in (select id_personne from enseignant where id_personne = :id_personne)", nativeQuery = true)
    public List<Personne> estEnseignant(@Param("id_personne") int id_personne);

    @Query(value = "SELECT * from personne where id in (select id_personne from etudiant where id_personne = :id_personne)", nativeQuery = true)
    public List<Personne> estEtudiant(@Param("id_personne") int id_personne);

}
