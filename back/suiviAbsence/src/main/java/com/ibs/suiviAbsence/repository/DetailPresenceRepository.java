package com.ibs.suiviAbsence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.suiviAbsence.modele.DetailPresence;
import java.util.List;

public interface DetailPresenceRepository  extends JpaRepository<DetailPresence, Integer>{
    public List<DetailPresence> findByIdPresenceAndIdClasseEtudiant(int idPresence,int idClasseEtudiant);
}
