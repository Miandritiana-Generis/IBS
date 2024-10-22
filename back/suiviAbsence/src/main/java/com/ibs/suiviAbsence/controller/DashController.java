package com.ibs.suiviAbsence.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.suiviAbsence.modele.Niveau;
import com.ibs.suiviAbsence.modele.ViewClasseDetail;
import com.ibs.suiviAbsence.modele.ViewListeAbsentTotalH;
import com.ibs.suiviAbsence.modele.ViewTauxAbsencePresence;
import com.ibs.suiviAbsence.service.DashService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
public class DashController {

    @Autowired
    DashService dashService;

    @GetMapping("/liste-classe")
    public ResponseEntity<List<ViewClasseDetail>> getListeClassse()
    {
        List<ViewClasseDetail> listeClasse = dashService.findViewClasseDetails();
        return ResponseEntity.ok(listeClasse);
    }

    @GetMapping("/totalAbsence")
    public long getAbsences(@RequestParam(required = false) String date, @RequestParam(required = false) Integer idClasse) {
        return dashService.getAbsenceCount(date, idClasse);
    }

    @GetMapping("/liste-niveau")
    public ResponseEntity<List<Niveau>> getListeNiveau(){
        List<Niveau> val = dashService.findNiveau();
        return ResponseEntity.ok(val);
    }

    @GetMapping("/taux-absence-presence")
    public List<ViewTauxAbsencePresence> getTauxAbsencePresence(
            @RequestParam(required = false) String monthYear,
            @RequestParam(required = false) Integer idClasse,
            @RequestParam(required = false) Integer idNiveau) {
        return dashService.getTauxAbsencePresence(monthYear, idClasse, idNiveau);
    }

@GetMapping("/total-heure-absence")
public ResponseEntity<Page<ViewListeAbsentTotalH>> getAbsentTotalH(
    @RequestParam(name = "monthYear", required = false) String monthYear,
    @RequestParam(value = "page", required = false, defaultValue = "0") int page,
    @RequestParam(value = "size", required = false, defaultValue = "10") int size
) {
    // Set monthYear to current month and year in 'YYYY-MM' format if null
    if (monthYear == null) {
        monthYear = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
    }

    Pageable pageable = PageRequest.of(page, size);
    Page<ViewListeAbsentTotalH> result = dashService.getAbsentTotalH(monthYear, pageable);

    return ResponseEntity.ok(result);
}

    
}