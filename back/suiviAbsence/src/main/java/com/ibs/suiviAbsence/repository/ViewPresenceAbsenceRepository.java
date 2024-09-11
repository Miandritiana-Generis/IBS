/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.ibs.suiviAbsence.repository;

import com.ibs.suiviAbsence.modele.ViewPresenceAbsence;
import java.sql.Date;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author abc
 */
public interface ViewPresenceAbsenceRepository  extends JpaRepository<ViewPresenceAbsence, Integer>{
    public List<ViewPresenceAbsence> findByDateBetweenAndIsPresent(Date date1, Date date2,boolean isPresent);
    public Page<ViewPresenceAbsence> findByDateBetweenAndIsPresent(Date date1, Date date2,boolean isPresent,Pageable pageable);

}