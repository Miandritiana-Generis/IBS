package com.ibs.common.ibs_common.service;


import com.ibs.common.ibs_common.exception.TokenException;
import com.ibs.common.ibs_common.model.ibs.Token;
import com.ibs.common.ibs_common.model.ibs.TokenApplication;
import com.ibs.common.ibs_common.repository.ibs.TokenApplicationRepository;
import com.ibs.common.ibs_common.repository.ibs.TokenRepository;
import java.util.List;

public class TokenApplicationService {
    TokenApplicationRepository tokenAppRepo;
    TokenRepository tokenRepo;

    public void deleteTokenApplication (String tokenValue, String idAppareil) {
        List<Token> token = this.tokenRepo.findByTokenAndIdAppareilAndExpirationAfterNow(tokenValue, idAppareil);
        
        if (!token.isEmpty()) {
            TokenApplication tokenApp = this.tokenAppRepo.findByIdToken(token.get(0).getId());

            if(tokenApp.getIdToken() == token.get(0).getId()){
                tokenAppRepo.deleteByIdToken(token.get(0).getId());
            }
            else {
                throw new TokenException(  "token invalide" );
            }
        }
        else {
          throw new TokenException(  "token invalide" );
        }
    }
}
