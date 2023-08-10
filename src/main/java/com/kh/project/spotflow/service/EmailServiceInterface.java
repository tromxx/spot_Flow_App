package com.kh.project.spotflow.service;

import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;


@Service
public interface EmailServiceInterface {
     // Write e-Mail
     MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException;
     // Email Confirm
     String createKey();
     // Send e-Mail
     String sendSimpleMessage(String to) throws Exception;
     // 임시 비밀번호 생서
     String getTempPassword();
     //
     MimeMessage createPwdMsg(String to) throws MessagingException, UnsupportedEncodingException;
     
     String sendPwdMessage(String to) throws Exception;
}