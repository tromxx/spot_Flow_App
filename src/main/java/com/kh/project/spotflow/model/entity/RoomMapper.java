package com.kh.project.spotflow.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Setter @Getter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class RoomMapper {
  @Id
  @Column(name = "ctr_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JsonManagedReference
  @JoinColumn(name = "ctr_customer")
  Customer customer;

  @ManyToOne
  @JsonManagedReference
  @JoinColumn(name = "ctr_room")
  ChatRoom chatRoom;
}
