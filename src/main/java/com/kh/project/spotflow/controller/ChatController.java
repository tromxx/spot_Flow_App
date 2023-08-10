package com.kh.project.spotflow.controller;

import com.kh.project.spotflow.model.dto.chat.ChatMessage;
import com.kh.project.spotflow.model.entity.ChatLog;
import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.service.AuthService;
import com.kh.project.spotflow.service.ChatService;
import com.kh.project.spotflow.service.CustomerService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@Slf4j
@RequiredArgsConstructor
@RestController
public class ChatController {
  private final SimpMessagingTemplate template;
  private final ChatService chatService;
  private final AuthService authService;
  private final CustomerService customerService;

  @MessageMapping("/message")
  public void greet(@Payload ChatMessage message) {
    log.info("매핑 테스트입니다.");
    log.info(message.toString());
    chatService.sendChat(message);
    if (message.getDate() == null) {
      message.setDate(LocalDateTime.now());
    }
    template.convertAndSend("/notification/message/" + message.getRoomId(), message);
  }

  @PostMapping("/room")
  public ResponseEntity<String> createRoom(@RequestBody Map<String, Object> request) {
    Customer sender = authService.getCustomerByEmail();
    Customer receiver =  customerService.userInfo((String) request.get("receiver"));
    log.info(sender.getEmail());
    log.info(receiver.getEmail());
    return new ResponseEntity<>(chatService.createRoom(sender, receiver), HttpStatus.OK);
  }

  @GetMapping("/chat/{id}")
  public ResponseEntity<List<ChatMessage>> findChatLog(@PathVariable String id) {
    return new ResponseEntity<>(chatService.findChatLog(id), HttpStatus.OK);
  }

}