/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.exception;

/**
 *
 * @author abc
 */
public class PresenceException extends RuntimeException{
    public PresenceException(){
        super();
    }
    
    public PresenceException(String message){
        super(message);
    }
}
