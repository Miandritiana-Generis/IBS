/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.service;

import com.ibs.suiviAbsence.modele.NotificationEdt;
import com.ibs.suiviAbsence.repository.NotificationEdtRepository;
import java.sql.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author abc
 */
@Service
public class NotificationService {
    @Autowired
    NotificationEdtRepository notificationEdtRepository;
    
    @Transactional(rollbackFor = Exception.class)
    public void genererNotification(int idEdt,String contenu,int type){
        NotificationEdt notificationEdt= new NotificationEdt(contenu, new Timestamp(System.currentTimeMillis()), idEdt,type);
        this.notificationEdtRepository.save(notificationEdt);
    }
}
