package com.ibs.suiviAbsence.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibs.suiviAbsence.modele.Niveau;
import com.ibs.suiviAbsence.modele.ViewClasseDetail;
import com.ibs.suiviAbsence.repository.NiveauRepository;
import com.ibs.suiviAbsence.repository.TotalAbsenceRepository;
import com.ibs.suiviAbsence.repository.ViewClasseDetailRepository;

/**
 *
 * @author abc
 */
@Service
public class DashService {
    
    @Autowired
    private ViewClasseDetailRepository viewClasseDetailRepository;

    @Autowired
    private TotalAbsenceRepository totalAbsenceRepository;

    @Autowired
    NiveauRepository niveauRepository;
    
    public List<ViewClasseDetail> findViewClasseDetails(){
        List<ViewClasseDetail> liste=viewClasseDetailRepository.findAll();
        return liste;
    }

    public long getAbsenceCount(String date, Integer idClasse) {
        if (date == null) {
            date = java.time.LocalDate.now().toString();
        }
        return totalAbsenceRepository.countAbsences(date, idClasse);
    }

    public List<Niveau> findNiveau(){
        List<Niveau> val = niveauRepository.findAll();
        return val;
    }
}
