package com.ibs.suiviAbsence.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibs.suiviAbsence.modele.Niveau;
import com.ibs.suiviAbsence.modele.ViewClasseDetail;
import com.ibs.suiviAbsence.modele.ViewTauxAbsencePresence;
import com.ibs.suiviAbsence.repository.NiveauRepository;
import com.ibs.suiviAbsence.repository.TotalAbsenceRepository;
import com.ibs.suiviAbsence.repository.ViewClasseDetailRepository;
import com.ibs.suiviAbsence.repository.ViewTauxAbsencePresenceRepository;

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

    @Autowired
    private ViewTauxAbsencePresenceRepository viewTauxAbsencePresenceRepository;
    
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

    public List<ViewTauxAbsencePresence> getTauxAbsencePresence(String monthYear, Integer idClasse, Integer idNiveau) {

        // if (monthYear == null || monthYear.isEmpty()) {
        //     monthYear = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
        // } else {
        //     // Validate and format monthYear to ensure it's in the correct format
        //     try {
        //         LocalDate.parse(monthYear, DateTimeFormatter.ofPattern("yyyy-MM")); // Validate format
        //     } catch (DateTimeParseException e) {
        //         // Handle invalid format (e.g., log the error and set to current month)
        //         monthYear = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
        //     }
        // }

        return viewTauxAbsencePresenceRepository.findByFilters(monthYear, idClasse, idNiveau);
    }

    private String validateMonthYear(String monthYear) {
        // If monthYear is null, return the current month in 'YYYY-MM' format
        if (monthYear == null || monthYear.isEmpty()) {
            return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
        }

        // Validate the format of the monthYear string
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
            LocalDate.parse(monthYear, formatter);  // Try to parse the string
            return monthYear;  // Return if valid
        } catch (DateTimeParseException e) {
            // Handle invalid format by returning the current month as default
            return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
        }
    }
}
