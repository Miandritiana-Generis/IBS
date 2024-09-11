package com.ibs.suiviAbsence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.suiviAbsence.modele.Token;

public interface TokenRepository extends JpaRepository<Token, Integer>{
    public Token findByToken(String token);
}
