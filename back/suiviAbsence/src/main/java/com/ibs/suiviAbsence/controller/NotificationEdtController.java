/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.controller;

import com.ibs.suiviAbsence.modele.ViewNotificationEdt;
import com.ibs.suiviAbsence.repository.ViewNotificationEdtRepository;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author abc
 */

@RestController
@RequestMapping("/notifications")
public class NotificationEdtController {
    @Autowired
    ViewNotificationEdtRepository notificationEdtRepository;
    
    @GetMapping()
    public ResponseEntity  listeNotification(@RequestParam(value = "page", required = false ,defaultValue = "0")   int page){
        Sort sort = Sort.by(Sort.Order.desc("dateheure"));
        Pageable pageable = PageRequest.of(page, 10,sort);
        Page<ViewNotificationEdt> notificationEdts= this.notificationEdtRepository.findAll(pageable);
        long nombre= this.notificationEdtRepository.count();
        HashMap map= new HashMap();
        map.put("data", notificationEdts.getContent());
        map.put("count", nombre);
        
        return ResponseEntity.ok(map);
    }
}
