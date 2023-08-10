package com.kh.project.spotflow.model.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "follow")
@Setter @Getter
@AllArgsConstructor @Builder
@NoArgsConstructor
public class Follow {
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "follower")
  private Customer follower; // 팔로우 기능을 실행한 사람

  @ManyToOne
  @JoinColumn(name = "following")
  private Customer following; // 팔로우하는 대상
  
  @Column(name = "set_follow")
  @ColumnDefault("FALSE")
  private boolean isCheckFollow; //맞팔로우를 위한 검증

  @Column(name = "follow_join_date")
  private LocalDateTime joinDate;

  @Override
  public String toString() {
    return "Follow{" +
            "id=" + id +
            ", follower=" + follower +
            ", following=" + following +
            ", joinDate=" + joinDate +
            '}';
  }
}


