package com.ibs.suiviAbsence.configuration;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */


 import org.springframework.context.annotation.Configuration;
 import org.springframework.web.servlet.config.annotation.CorsRegistry;
 import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
 
 /**
  *
  * @author USER
  */
 @Configuration
 public class CorsConfiguration implements WebMvcConfigurer{
     @Override
     public void addCorsMappings(CorsRegistry registry) {
         registry.addMapping("/**")
                 .allowedOrigins("http://localhost:4400", "http://127.0.0.1:5000/") // Remplacez avec votre URL Angular
                 .allowedMethods("GET", "POST", "PUT", "DELETE")
                 .allowedHeaders("*")
                 .allowCredentials(true)
                 .maxAge(3600);
     }
 }
 
