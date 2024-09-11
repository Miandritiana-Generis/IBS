package com.ibs.common.ibs_common.repository.ibs;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.common.ibs_common.model.ibs.TokenApplication;

public interface TokenApplicationRepository extends JpaRepository<TokenApplication, Integer>{
    public void deleteByIdToken(Integer idToken);
    public TokenApplication findByIdToken(Integer idToken);
    public List<TokenApplication> findByIdTokenAndIdApplication(int idToken , int idApplication);
}
