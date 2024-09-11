package com.ibs.common.ibs_common.service.serviceNextcloud;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.ibs.common.ibs_common.utilitaire.Constante;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String to, String subject, String body) {
        String bodyComplement = "mail ";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        
        try {
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace(); // Ajoutez une gestion des exceptions appropriée ici
        }
    }

    public void sendHtmlEmail(String to, String subject, String fileTarget, int fileSource, String item_type) {
        String from = "ibs_noreply@iscam.mg"; 
        String fromName = "iscam business school"; 
        String temp = "";
        if(item_type.equals("folder")) {
            temp = "dossier";
        }
        else if(item_type.equals("file")) {
            temp = "fichier";
        }
        String htmlBody = "<!DOCTYPE html>"
            + "<html>"
            + "<head>"
            + "<style>"
            + "body {"
            + "    font-family: Arial, sans-serif;"
            + "    background-color: #f4f4f4;"
            + "    margin: 0;"
            + "    padding: 0;"
            + "}"
            + ".container {"
            + "    background-color: #ffffff;"
            + "    margin: 50px auto;"
            + "    padding: 20px;"
            + "    border-radius: 10px;"
            + "    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);"
            + "    width: 80%;"
            + "    max-width: 600px;"
            + "}"
            + "h1 {"
            + "    color: #333333;"
            + "}"
            + "p {"
            + "    color: #666666;"
            + "}"
            + ".button {"
            + "    display: inline-block;"
            + "    background-color: blue;"  
            + "    color: white;"
            + "    padding: 10px 20px;"
            + "    text-align: center;"
            + "    text-decoration: none;" // Correction de text-decoration
            + "    border-radius: 5px;"
            + "    font-size: 16px;"
            + "    margin-top: 20px;"
            + "}"
            + ".button:hover {"
            + "    background-color: #45a049;"
            + "}"
            + "</style>"
            + "</head>"
            + "<body>"
            + "<div class='container'>"
            + "    <h1>ISCAM Business School</h1>"
            + "    <p><strong>Le "+temp+" nommé "+fileTarget+" va bientôt être expiré</strong></p>"
            + "    <p>Cliquez sur le bouton ci-dessous pour l'ouvrir</p>"
            + "    <a href='"+Constante.Base_URL_Gestion_Fichier+"apps/files/files/"+fileSource+"?dir="+fileTarget+"' class='button'>Ouvrir</a>"
            + "</div>"
            + "</body>"
            + "</html>";

        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // Le deuxième paramètre "true" indique que le contenu est du HTML
            helper.setFrom(from, fromName); // Définir l'adresse e-mail et le nom de l'expéditeur

            mailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace(); // Ajoutez une gestion des exceptions appropriée ici
        }
    }
}
