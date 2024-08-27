package com.ibs.suiviAbsence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.suiviAbsence.modele.Presence;

public interface PresenceRepository extends JpaRepository<Presence, Integer>{

}
