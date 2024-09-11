package com.ibs.common.ibs_common.exception;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GestionnaireErreur {
    /**
     * Cette méthode gère les exception quand les token sont invalides par exemple
     * @param ex
     * @return
     */
    @ExceptionHandler(TokenException.class)
    public ResponseEntity<ReponseErreurBean> handleTokenExceptions(TokenException ex) {
        ReponseErreurBean res = new ReponseErreurBean();
        res.setTimestamp(new Date().getTime());
        res.setErreurs(new ArrayList<>());
        res.getErreurs().add(new ErreurBean("E001", ex.getMessage()));
        return ResponseEntity.badRequest().body(res);
    }

    /**
     * Cette méthode gère les exception validation de métier
     * il a comme erreur code e002
     * @param ex l'erreur provenant des restController
     */
    @ExceptionHandler(LoginException.class)
    public ResponseEntity<ReponseErreurBean> handleValidationExceptions(LoginException ex) {
        ReponseErreurBean res = new ReponseErreurBean();
        res.setTimestamp(new Date().getTime());
        res.setErreurs(new ArrayList<>());
        res.getErreurs().add(new ErreurBean("E002", ex.getMessage()));
        return ResponseEntity.badRequest().body(res);
    }
}
