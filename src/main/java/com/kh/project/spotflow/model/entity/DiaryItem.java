package com.kh.project.spotflow.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter @Setter
public class DiaryItem {
  @Id
  @Column(name = "mapper_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JsonManagedReference
  @JoinColumn(name = "mapper_diary")
  private Diary diary;

  @ManyToOne
  @JsonManagedReference
  @JoinColumn(name ="mapper_time_line")
  private TimeLine timeLine;
  @Builder
  public DiaryItem(Diary diary, TimeLine timeLine) {
    this.diary = diary;
    this.timeLine = timeLine;
  }

  public DiaryItem() {

  }
}
