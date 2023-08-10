package com.kh.project.spotflow.model.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "diary_comment")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiaryComment {

  public String toString() {
    return "DiaryComment{" +
            "id=" + id +
            ", customer=" + customer +
            ", diary=" + diary +
            ", content='" + content + '\'' +
            ", joinDate=" + joinDate +
            ", update=" + update +
            ", isDelete=" + isDelete +
            '}';
  }

  @Id
  @Column(name = "cm_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "cm_customer")
  @JsonManagedReference
  private Customer customer;

  @ManyToOne
  @JoinColumn(name = "cm_diary")
  @JsonManagedReference
  private Diary diary;

  @Column(name = "cm_content", nullable = false, length = 512)
  private String content;

  @Column(name = "cm_join_date")
  private LocalDateTime joinDate;

  @Column(name = "cm_update")
  private LocalDateTime update;

  @Column(name = "cm_delete")
  private boolean isDelete;
}
