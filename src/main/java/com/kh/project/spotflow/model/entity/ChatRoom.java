package com.kh.project.spotflow.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "chat_room")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder @ToString
public class ChatRoom {

  @Id
  @Column(name = "room_id")
  private String id;

  @Column(name = "start_date")
  private LocalDateTime date;

  @OneToMany(mappedBy = "roomId")
  @JsonBackReference
  private List<ChatLog> chatLogList;
}