package com.kh.project.spotflow.model.dto.chat;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
  private String roomId; // 방 아이디
  private String receiver; // to
  private String sender; // from
  private String message; // 교환 데이터
  private LocalDateTime date;
}