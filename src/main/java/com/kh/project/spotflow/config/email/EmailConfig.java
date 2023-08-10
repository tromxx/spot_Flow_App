package com.kh.project.spotflow.config.email;

import java.util.Properties;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;


@Configuration
public class EmailConfig {

     private Properties getMailProperties() {
          Properties properties = new Properties();
          properties.setProperty("mail.transport.protocol", "smtp");
          properties.setProperty("mail.smtp.auth", "true");
          properties.setProperty("mail.smtp.starttls.enable", "true");
          properties.setProperty("mail.debug", "true");
          properties.setProperty("mail.smtp.ssl.trust", "smtp.naver.com");
          properties.setProperty("mail.smtp.ssl.enable", "true");
          return properties;
     }
     
     public JavaMailSender javaMailService() {
          JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
          javaMailSender.setHost("smtp.naver.com");
          javaMailSender.setUsername("husik927@naver.com");
          javaMailSender.setPassword("canpast92@");
          javaMailSender.setPort(465);
          javaMailSender.setJavaMailProperties(getMailProperties());
          return javaMailSender;
     }
}