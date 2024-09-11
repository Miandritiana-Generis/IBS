package com.ibs.common.ibs_common.repository.gestionFichier;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ibs.common.ibs_common.model.gestionFichier.OCAccountsData;

public interface OCAccountsDataRepository //extends JpaRepository<OCAccountsData, Long>
{

//    @Query(value= "select * from oc_accounts_data  where name = 'email'", nativeQuery = true)
//    public List<OCAccountsData> getMailUsers();


}
