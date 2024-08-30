package com.ibs.suiviAbsence.repository;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibs.suiviAbsence.modele.ViewEdtAllInfo;

public interface ViewEdtAllInfoRepository extends JpaRepository<ViewEdtAllInfo, Integer>{
    @Query("select e from ViewEdtAllInfo e where e.idSalle=:idSalle and e.date=:date and :time between e.debut and e.fin")
    public List<ViewEdtAllInfo> findAllByIdSalle(@Param("idSalle") int idSalle,@Param("date") Date date
    ,@Param("time") Time time );
    
    public List<ViewEdtAllInfo> findByIdEnseignant(int idEnseingant);
    public List<ViewEdtAllInfo> findByIdEnseignantAndDateBetween(int idEnseingant,Date datedebut,Date datefin);
    
    public List<ViewEdtAllInfo> findAllByDateBetween(Date datedebut,Date datefin);

}
