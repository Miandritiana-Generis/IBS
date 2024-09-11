/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.common.ibs_common.utilitaire;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 *
 * @author USER
 */
public class FonctionUtil {
    
    /**
     * Cette methode permet de recuperer la valeur du Bearer token
     * @param autorisation
     * @return 
     */
    public static String getBearerToken(String autorisation){
        return autorisation!=null?autorisation.substring(7):"";
    }
    
    public static String md5(String mot) throws NoSuchAlgorithmException{
        if(mot==null) return null;
        MessageDigest messageDigest = MessageDigest.getInstance("MD5");
            messageDigest.update(mot.getBytes());
            byte[] digest = messageDigest.digest();
            StringBuilder stringBuilder = new StringBuilder();
            for (byte b : digest) {
                stringBuilder.append(String.format("%02x", b));
            }
            return stringBuilder.toString(); 
    }
}
