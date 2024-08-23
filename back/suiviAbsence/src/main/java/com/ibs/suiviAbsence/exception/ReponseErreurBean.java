package com.ibs.suiviAbsence.exception;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 *  Java bean pour envoyer les lignes d'erreurs
 */
@Getter
@Setter
public class ReponseErreurBean {
    public long timestamp;
    public List<ErreurBean> erreurs;
}
