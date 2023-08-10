package com.kh.project.spotflow.model.dto.chat;

import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ChatRoomDto {
  private String roomId;
  private String name;

}