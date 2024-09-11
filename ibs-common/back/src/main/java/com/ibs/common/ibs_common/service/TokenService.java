package com.ibs.common.ibs_common.service;



import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibs.common.ibs_common.exception.TokenException;
import com.ibs.common.ibs_common.model.ibs.Personne;
import com.ibs.common.ibs_common.model.ibs.Token;
import com.ibs.common.ibs_common.model.ibs.TokenApplication;
import com.ibs.common.ibs_common.model.ibs.ViewTokenApplication;
import com.ibs.common.ibs_common.repository.ibs.TokenApplicationRepository;
import com.ibs.common.ibs_common.repository.ibs.TokenRepository;
import com.ibs.common.ibs_common.repository.ibs.ViewTokenApplicationRepository;
import com.ibs.common.ibs_common.utilitaire.FonctionUtil;


@Service
public class TokenService {
     @Autowired
    TokenRepository tokenRepository;
    @Autowired
    TokenApplicationRepository tokenappRepo;
    TokenApplicationService tokenAppService;
    @Autowired
    ViewTokenApplicationRepository viewTokenApplicationRepository;

   /** methode pour vérifier si un token est valide ou non
 * @param tokenValue
 * @param idAppareil
 * @return
 */
public boolean tokenEstValide (String tokenValue, String idAppareil) {
     boolean isValide;
     List<Token> token = this.tokenRepository.findByTokenAndIdAppareilAndExpirationAfterNow(tokenValue, idAppareil);
     if (!token.isEmpty()) {
          isValide = true;
     }
     else {
          isValide = false;
     }
     return isValide;
   }

/** methode pour vérifier si un token et expiré
 * @param tokenValue
 * @return
 */
public boolean tokenEstExpire (String tokenValue, String idAppareil){
     boolean expire;
     List<Token> token = this.tokenRepository.findByTokenAndIdAppareilAndExpirationAfterNow(tokenValue, idAppareil);
     if ( token.isEmpty()) {
          expire = false;
     }
     else {
          expire = true;
     }
     return expire;
   }

/** méthode pour se déconnecter
 * @param tokenValue
 */
public void deleteToken (String tokenValue, String idAppareil) {
        Token token = this.tokenRepository.findByTokenAndIdAppareil(tokenValue, idAppareil);
        if (token != null) {
            tokenAppService.deleteTokenApplication(tokenValue,idAppareil);
            tokenRepository.deleteById(token.getId());
        }
        else {
          throw new TokenException( "token invalide" );
        }

   }

   public Token insertToken(Personne personne,String idappareil) throws NoSuchAlgorithmException{

     Long currentTime=System.currentTimeMillis();
     Timestamp date=new Timestamp(currentTime+(1000*60*60));
     String tokenValue = FonctionUtil.md5(String.format("%d%d",personne.getId(),currentTime) );
     Token token=new Token(tokenValue, date, idappareil,personne.getId() );
     token=this.tokenRepository.save(token);
     return token;
   }
   
   public Token insertToken(Personne personne,String idappareil,int idLogin) throws NoSuchAlgorithmException{

     Long currentTime=System.currentTimeMillis();
     Timestamp date=new Timestamp(currentTime+(1000*60*60));
     String tokenValue = FonctionUtil.md5(String.format("%d%d",personne.getId(),currentTime) );
     Token token=new Token(tokenValue, date, idappareil,personne.getId(),idLogin );
     token=this.tokenRepository.save(token);
     return token;
   }

   public ViewTokenApplication insertTokenApplication(Token token, int idApplication){
     TokenApplication tokenApplication=null;
     List<TokenApplication> liste= this.tokenappRepo.findByIdTokenAndIdApplication(token.getId(), idApplication);
     if(liste.isEmpty()){
          tokenApplication= new TokenApplication(token.getId(),idApplication);
          tokenApplication=this.tokenappRepo.save(tokenApplication);
     }
     ViewTokenApplication view= viewTokenApplicationRepository.findById(tokenApplication.getId()).get();
     return view;
   }

}
