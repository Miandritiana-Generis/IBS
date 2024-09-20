package com.ibs.suiviAbsence.modele;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name="v_taux_absence_presence")
@Entity
public class ViewTauxAbsencePresence {

    @Id
    @Column(name = "month_year")
    private String monthYear;

    @Column(name = "absent_count")
    private Long absentCount;

    @Column(name = "present_count")
    private Long presentCount;
}
