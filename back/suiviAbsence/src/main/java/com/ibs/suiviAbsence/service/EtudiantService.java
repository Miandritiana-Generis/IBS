/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ibs.suiviAbsence.service;

import com.ibs.suiviAbsence.modele.ViewClasseEtudiant;
import com.ibs.suiviAbsence.repository.ViewClasseEtudiantRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author abc
 */
@Service
public class EtudiantService {
    @Autowired
    ViewClasseEtudiantRepository viewClasseEtudiantRepository;
    public ViewClasseEtudiant findClasseEtudiant(int idEtudiant){
        ViewClasseEtudiant classEtudiant=null;
        List<ViewClasseEtudiant> list=viewClasseEtudiantRepository.findClasseEtudiantAtCurrentDate(idEtudiant);
        if(!list.isEmpty()){
            classEtudiant=list.get(0);
        }
        return classEtudiant;
    }
}
