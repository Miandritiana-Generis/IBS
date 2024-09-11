package com.ibs.common.ibs_common.task;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.ibs.common.ibs_common.model.gestionFichier.OCAccountsData;
import com.ibs.common.ibs_common.model.gestionFichier.OCExpirationMailEnvoye;
import com.ibs.common.ibs_common.model.gestionFichier.VOcShare;
import com.ibs.common.ibs_common.repository.gestionFichier.OCAccountsDataRepository;
import com.ibs.common.ibs_common.repository.gestionFichier.OCExpirationMailEnvoyeRepository;
import com.ibs.common.ibs_common.repository.gestionFichier.VOcShareRepository;
import com.ibs.common.ibs_common.service.serviceNextcloud.EmailService;

@Component
public class NotificationTask {

//    @Autowired
//    private EmailService emailService;
//
//    @Autowired
//    private OCAccountsDataRepository ocAccountsDataRepository;
//
//    @Autowired
//    private VOcShareRepository ocShareRepository;
//
//    @Autowired
//    private OCExpirationMailEnvoyeRepository expiration;

//    @Scheduled(fixedRate = 3600000)  // Exécuter toutes les heures
//    public void performTask() {
//        try {
//            List<OCAccountsData> liste = ocAccountsDataRepository.getMailUsers();
//            System.out.println("Taille de liste: " + liste.size());
//            List<OCExpirationMailEnvoye> listeMailExpiration = expiration.findAll();
//            List<VOcShare> shareList = ocShareRepository.getExpiration();
//            List<VOcShare> notSentList = ocShareRepository.getExpirationPasEncoreEnvoyé();
//
//            if (notSentList == null || notSentList.isEmpty()) {
//                System.out.println("shareList est null ou vide, tâche annulée.");
//                return;
//            }
//
//            if(notSentList != null ) {
//                boolean hasElementNotInList2 = shareList.stream().anyMatch(element -> !listeMailExpiration.contains(element));
//                System.out.println("Envoi d'email aux utilisateurs...");
//                for (int j =0; j<1; j++) {
//                    for (int i=0; i<notSentList.size(); i++) {
//                        String subject = "Expiration" + notSentList.get(i).getFile_target();
//                        System.out.println("DONNEES:"+subject);
//                        emailService.sendHtmlEmail(liste.get(j).getValue(), subject, notSentList.get(i).getFile_target(), notSentList.get(i).getFile_source(),notSentList.get(i).getItem_type());
//                    }
//                }
//                expiration.insertExporation(shareList.get(0).getId());
//            } else {
//                System.out.println("Rien à envoyer");
//            }
//        } catch (Exception e) {
//            System.out.println("Erreur lors de l'exécution de la tâche : " + e.getMessage());
//            e.printStackTrace();
//        }
//    }
}
