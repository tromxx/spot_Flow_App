package com.kh.project.spotflow.service;

import com.kh.project.spotflow.model.dto.chat.ChatMessage;
import com.kh.project.spotflow.model.entity.ChatLog;
import com.kh.project.spotflow.model.entity.ChatRoom;
import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.model.entity.RoomMapper;
import com.kh.project.spotflow.repository.Chat.ChatLogRepository;
import com.kh.project.spotflow.repository.Chat.ChatRoomRepository;
import com.kh.project.spotflow.repository.Chat.RoomMapperRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {
  private final AuthService authService;
  private final ChatLogRepository chatLogRepository;
  private final RoomMapperRepository mapperRepository;
  private final ChatRoomRepository roomRepository;
  private final CustomerService customerService;

  public String createRoom(Customer sender, Customer receiver) {
    List<ChatRoom> endpoint = mapperRepository.findChatRoom(sender);
    for (ChatRoom e : endpoint) {
      List<ChatRoom> mappers = mapperRepository.findChatRoom(receiver);
      log.info(e.toString());
      for (ChatRoom m : mappers) {
        if (e == m) {
          log.info("채팅방이 존재합니다. 새로운 채팅방을 만들 수 없습니다.");
          return e.getId();
        }
      }

    }
    String code = (
      (
        sender.getEmail() + sender.getJoinDate().toString() +
        receiver.getEmail() + receiver.getJoinDate().toString()
      ).length()
    ) + "";
    String result = LocalDateTime.now().toString() + code;
    ChatRoom chatRoom = ChatRoom.builder()
            .id(result)
            .date(LocalDateTime.now())
            .build();
    roomRepository.save(chatRoom);

    List<RoomMapper> mappers = new ArrayList<>();
    mappers.add(RoomMapper.builder()
            .chatRoom(chatRoom)
            .customer(sender)
            .build());
    mappers.add(RoomMapper.builder()
            .chatRoom(chatRoom)
            .customer(receiver)
            .build());
    mapperRepository.saveAll(mappers);
    return result ;
  }

  @Transactional
  public void sendChat(ChatMessage message) {
    log.info("서비스 로직 접근");
    ChatRoom chatRoom = roomRepository.findChatRoomById(message.getRoomId());
    if (chatRoom != null) {
      log.info("채팅방이 존재합니다.");
      Customer sender = customerService.userInfo(message.getSender());
      log.info(message.getSender());
      ChatLog chatLog = ChatLog.builder()
              .roomId(chatRoom)
              .sender(sender)
              .content(message.getMessage())
              .isDelete(false)
              .date(LocalDateTime.now())
              .build();
      chatLogRepository.save(chatLog);
    } else {
      log.info("채팅 방이 없습니다.");
    }
  }

  public List<ChatMessage> findChatLog(String id) {
    ChatRoom room = roomRepository.findChatRoomById(id);
    List<ChatLog> logList = chatLogRepository.findByRoomIdOrderByDateDesc(room);
    List<ChatMessage> messageList = new ArrayList<>();
    for (ChatLog l : logList) {
      log.info(l.getRoomId().getId());
      ChatMessage message = ChatMessage.builder()
              .roomId(l.getRoomId().getId())
              .sender(l.getSender().getEmail())
              .message(l.getContent())
              .date(l.getDate())
              .build();
      messageList.add(message);
    }
    return messageList;
  }
}