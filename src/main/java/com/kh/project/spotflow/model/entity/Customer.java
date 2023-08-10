package com.kh.project.spotflow.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.kh.project.spotflow.model.constant.Authority;
import com.kh.project.spotflow.model.constant.OpenStatus;
import com.kh.project.spotflow.model.constant.Theme;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "customer")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Customer {


//  // 개인프로필 접근할때 아이디 컬럼 필요해서 추가
//  @GeneratedValue(strategy = GenerationType.SEQUENCE)
//  @Column(name = "ct_id")
//  private Long id;

  @Id
  @Column(name = "ct_email")
  private String email;

  @Column(name = "ct_nick_name",unique = true, nullable = false)
  private String nickName;

  @Column(name = "ct_pwd")
  private String password;

  @Column(name = "ct_stat_msg")
  private String statMsg;

  @Column(name = "ct_profile_pic", columnDefinition = "LONGTEXT")
  private String profilePic; // 프로필 사진이 저장된 위치를 저장

  @Column(name = "ct_join_date")
  private LocalDateTime joinDate;

  @Column(name = "ct_update")
  private LocalDateTime updateTime;

  @Enumerated(EnumType.STRING)
  @Column(name = "ct_open_stat")
  private OpenStatus openStatus;

  @Enumerated(EnumType.STRING)
  @Column(name = "ct_theme")
  private Theme theme;

  @Enumerated(EnumType.STRING)
  @Column(name = "ct_authority")
  private Authority authority;

  @OneToMany(mappedBy = "customer")
  @JsonBackReference
  private List<TimeLine> timeLineList;

  @OneToMany(mappedBy = "customer")
  @JsonBackReference
  private List<Diary> diaryList;

  @OneToMany(mappedBy = "follower")
  @JsonBackReference
  private List<Follow> followList;

  @OneToMany(mappedBy = "following")
  @JsonBackReference
  private List<Follow> followingList;

  @OneToMany(mappedBy = "customer")
  @JsonBackReference
  private List<DiaryComment> commentList;

  @OneToMany(mappedBy = "follower")
  @JsonBackReference
  private List<Follow> followerList;

  @OneToMany(mappedBy = "customer")
  @JsonBackReference
  private List<Like> likeList;

}
