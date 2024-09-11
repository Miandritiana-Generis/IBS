package com.ibs.common.ibs_common.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.common.ibs_common.service.serviceNextcloud.EmailService;

import jakarta.mail.MessagingException;



//@RestController
public class EmailController {

//    @Autowired
//    private final EmailService emailService;
//
//    @Autowired
//    public EmailController(EmailService emailService) {
//        this.emailService = emailService;
//    }
//
//    @GetMapping("/send-email")
//    public String sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String file_target, @RequestParam int file_source , String item_type) throws MessagingException{
//        emailService.sendHtmlEmail(to, subject, file_target, file_source, item_type);
//        return "Email sent successfully";
//    }

}
