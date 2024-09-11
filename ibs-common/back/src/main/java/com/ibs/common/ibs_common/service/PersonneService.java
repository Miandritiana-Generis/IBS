/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.common.ibs_common.service;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibs.common.ibs_common.dto.TokenReponseDTO;
import com.ibs.common.ibs_common.exception.LoginException;
import com.ibs.common.ibs_common.exception.TokenException;
import com.ibs.common.ibs_common.model.ibs.Login;
import com.ibs.common.ibs_common.model.ibs.Personne;
import com.ibs.common.ibs_common.model.ibs.Token;
import com.ibs.common.ibs_common.model.ibs.ViewTokenApplication;
import com.ibs.common.ibs_common.model.ibs.ViewTokenUtilisateur;
import com.ibs.common.ibs_common.repository.ibs.LoginRepository;
import com.ibs.common.ibs_common.repository.ibs.PersonneRepository;
import com.ibs.common.ibs_common.repository.ibs.ViewTokenUtilisateurRepository;
import com.ibs.common.ibs_common.utilitaire.FonctionUtil;

/**
 *
 * @author USER
 */
@Service
public class PersonneService {
    @Autowired
    private PersonneRepository personneRepository ;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private ViewTokenUtilisateurRepository viewTokenUtilisateurRepository;
    @Autowired
    private LoginRepository loginRepository;
    public ViewTokenUtilisateur getInfoPersonne(String token,String idAppareil){
        System.out.println("Token='"+token+"'");
        ViewTokenUtilisateur personne=null;
        if(tokenService.tokenEstValide(token, idAppareil)){
            personne= this.viewTokenUtilisateurRepository.findAllByToken(token);
        }
        else{
            this.tokenService.deleteToken(token, idAppareil);
            throw new TokenException("Token invalide");
        }
        return personne;
    }
    
    public TokenReponseDTO loginNewMethod(String login,String password,int application,String idappareil) throws NoSuchAlgorithmException{
        List<Login> logins = loginRepository.findByLogin(login);
        Personne personne;
        Login loginObject;
        if(logins.size()<=0){
            throw new LoginException("Nom d'utilisateur incorrect.");
        }
        loginObject=logins.getFirst();
         String mdp=FonctionUtil.md5(password);
         System.out.println("mdp=='"+loginObject.getPassword()+"'");
         mdp=mdp.trim();
        if(!loginObject.getPassword().equals(mdp)){
            throw new LoginException("Mot de passe incorrect.");
        }
        personne= this.personneRepository.findById(loginObject.getIdPersonne());
        Token token= tokenService.insertToken(personne, idappareil,loginObject.getId());
        //enregistrer Token Application
        ViewTokenApplication tokenApplication=this.tokenService.insertTokenApplication(token, application);
        TokenReponseDTO tokendto= new TokenReponseDTO();
        tokendto.setToken(token);
        tokendto.setTokenApplication(tokenApplication);
        return tokendto;
    }
    
    public TokenReponseDTO login(String login,String password,int application,String idappareil) throws NoSuchAlgorithmException{
        
        List<Personne> personnes = personneRepository.findByLogin(login);
        Personne personne;
        if(personnes.size()<=0){
            throw new LoginException("Nom d'utilisateur incorrect.");
        }
        personne= personnes.getFirst();
        String mdp=FonctionUtil.md5(password);
        if(!personne.getMdp().equals(mdp)){
            throw new LoginException("Mot de passe incorrect.");
        }
        //enregistrer Token 
        Token token= tokenService.insertToken(personne, idappareil);
        
        //enregistrer Token Application
        ViewTokenApplication tokenApplication=this.tokenService.insertTokenApplication(token, application);
        TokenReponseDTO tokendto= new TokenReponseDTO();
        tokendto.setToken(token);
        tokendto.setTokenApplication(tokenApplication);
        return tokendto;
    }

    
}
