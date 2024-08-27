package com.ibs.suiviAbsence.service;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibs.suiviAbsence.modele.ViewEdtAllInfo;
import com.ibs.suiviAbsence.repository.ViewEdtAllInfoRepository;

@Service
public class PresenceService {
    @Autowired
    ViewEdtAllInfoRepository viewEdtAllInfoRepository;
    public ViewEdtAllInfo getInfoEdt(int idSalle,int idEdt){
        ViewEdtAllInfo edt=null;
        if(idEdt==0){
            edt=viewEdtAllInfoRepository.findById(idEdt).get();
        }
        else{
            long currentTimeMillis=System.currentTimeMillis();
            Date date= new Date(currentTimeMillis);
            Time time = new Time(currentTimeMillis);
            List<ViewEdtAllInfo> liste= viewEdtAllInfoRepository.findAllByIdSalle(idSalle, date, time);
            if(!liste.isEmpty()){
                edt=liste.get(0);
            }
        }
        return edt;
    }

}
