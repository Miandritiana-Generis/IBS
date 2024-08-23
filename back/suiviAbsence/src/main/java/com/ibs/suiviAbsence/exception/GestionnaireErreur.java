package com.ibs.suiviAbsence.exception;

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
    @ExceptionHandler(EdtException.class)
    public ResponseEntity<ReponseErreurBean> handleTokenExceptions(EdtException ex) {
        ReponseErreurBean res = new ReponseErreurBean();
        res.setTimestamp(new Date().getTime());
        res.setErreurs(new ArrayList<>());
        res.getErreurs().add(new ErreurBean("E001", ex.getMessage()));
        return ResponseEntity.badRequest().body(res);
    }

   
}
