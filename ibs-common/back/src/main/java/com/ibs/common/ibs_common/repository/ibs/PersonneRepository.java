package com.ibs.common.ibs_common.repository.ibs;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.common.ibs_common.model.ibs.Personne;

import java.util.List;

public interface PersonneRepository extends JpaRepository<Personne, Long>{
    public List<Personne> findByLogin(String login);
    public Personne findById(int id);
}
