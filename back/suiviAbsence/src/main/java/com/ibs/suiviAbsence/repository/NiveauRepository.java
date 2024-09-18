package com.ibs.suiviAbsence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.suiviAbsence.modele.Niveau;

public interface NiveauRepository extends JpaRepository<Niveau, Integer>{
    
}
