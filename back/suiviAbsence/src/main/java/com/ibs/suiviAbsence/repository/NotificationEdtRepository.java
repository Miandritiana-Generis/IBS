/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.ibs.suiviAbsence.repository;

import com.ibs.suiviAbsence.modele.NotificationEdt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


/**
 *
 * @author abc
 */
public interface NotificationEdtRepository extends JpaRepository<NotificationEdt, Integer>{
    
    @Override
    public Page<NotificationEdt> findAll(Pageable pageable);
    
    @Query("SELECT COUNT(n) FROM NotificationEdt n WHERE FUNCTION('DATE', n.dateheure) = CURRENT_DATE")
    public long count();
}
