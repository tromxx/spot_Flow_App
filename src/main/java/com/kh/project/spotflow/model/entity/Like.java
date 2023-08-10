package com.kh.project.spotflow.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Table(name = "diary_like")
@Entity
public class Like {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JsonManagedReference
  @JoinColumn(name = "like_customer")
  private Customer customer;

  @ManyToOne
  @JsonManagedReference
  @JoinColumn(name = "like_diary")
  private Diary diary;

  @Column(name = "like_join_date")
  private LocalDateTime joinDate;

}
