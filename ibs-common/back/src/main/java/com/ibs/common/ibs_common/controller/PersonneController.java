package com.ibs.common.ibs_common.controller;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.common.ibs_common.dto.LoginDTO;
import com.ibs.common.ibs_common.dto.TokenReponseDTO;
import com.ibs.common.ibs_common.model.ibs.Application;
import com.ibs.common.ibs_common.repository.ibs.ApplicationRepository;
import com.ibs.common.ibs_common.service.PersonneService;
import com.ibs.common.ibs_common.service.TokenService;
import com.ibs.common.ibs_common.utilitaire.FonctionUtil;

@RestController
public class PersonneController {
    @Autowired
    PersonneService personneService;
    @Autowired
    TokenService tokenService;
    @Autowired
    private ApplicationRepository appliRepo;
    
    @GetMapping("/personnes/info")
    public ResponseEntity getInfoPersonne(@RequestHeader(value = "Authorization", required = true)String authorizationHeader,
            @RequestHeader(value = "User-Agent", required = true)String idAppareil){
        String token = FonctionUtil.getBearerToken(authorizationHeader);
        return new ResponseEntity(personneService.getInfoPersonne(token, idAppareil),HttpStatus.OK);
    }
    
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDTO login,
    @RequestHeader(value = "User-Agent", required = true)String idappareil,
    @RequestHeader(value= "Id-Application",required = true,defaultValue = "0") int idApplication
    ) throws NoSuchAlgorithmException{
        TokenReponseDTO token= personneService.loginNewMethod(login.getLogin(),login.getMdp(),
        idApplication,idappareil);
        
        return new ResponseEntity(token,HttpStatus.OK);
    }

    /** méthode pour se déconnecter
     * @param authorizationHeader
     * @return
     */
    @GetMapping("logout")
    public ResponseEntity logout(@RequestHeader(value = "Authorization", required = true)String authorizationHeader, @RequestHeader(value = "User-Agent", required = true)String idappareil) {
        String token = FonctionUtil.getBearerToken(authorizationHeader);
        tokenService.deleteToken(token, idappareil);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("liste-application")
    public ResponseEntity<List<Application>> listerApplication() {
        List<Application> applications = appliRepo.findAll();
        return ResponseEntity.ok(applications);
    }
    

    
}
