/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.ibs.suiviAbsence.repository;

import com.ibs.suiviAbsence.modele.NotificationEdt;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author abc
 */
public interface NotificationEdtRepository extends JpaRepository<NotificationEdt, Integer>{
    
}