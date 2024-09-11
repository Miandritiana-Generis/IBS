package com.ibs.common.ibs_common.exception;

public class LoginException extends RuntimeException{
    public LoginException(){

    }
    public LoginException(String message){
        super(message);
    }
}
