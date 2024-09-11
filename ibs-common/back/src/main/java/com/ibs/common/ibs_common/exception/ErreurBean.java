package com.ibs.common.ibs_common.exception;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ErreurBean {
    public String codeErreur;
    public String messageErreur;

    public ErreurBean(String codeErreur, String messageErreur) {
       this.codeErreur = codeErreur;
       this.messageErreur = messageErreur;
    }
}
