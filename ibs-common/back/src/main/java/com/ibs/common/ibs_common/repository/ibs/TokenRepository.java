package com.ibs.common.ibs_common.repository.ibs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibs.common.ibs_common.model.ibs.Token;
import java.util.List;


public interface TokenRepository extends JpaRepository<Token, Integer> {
    public Token findByToken(String  token);
    public Token findByTokenAndIdAppareil(String  token, String idAppareil);
    @Override
    public void deleteById(Integer idToken);

    @Query("SELECT t FROM Token t WHERE t.token = :token AND t.idAppareil = :idAppareil AND t.expiration > CURRENT_TIMESTAMP")
    public List<Token> findByTokenAndIdAppareilAndExpirationAfterNow(@Param("token") String token, @Param("idAppareil") String idappareil);

}
