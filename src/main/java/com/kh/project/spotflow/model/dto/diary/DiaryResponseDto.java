package com.kh.project.spotflow.model.dto.diary;

import com.kh.project.spotflow.model.dto.TimeLine.TimeLineSummaryDto;
import com.kh.project.spotflow.model.entity.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class DiaryResponseDto {
  private Long id;
  private String title;
  private String content;
  private Customer customer; // 다이어리 게시자
  private LocalDateTime joinDate;
  private LocalDateTime updateTime;
  private Integer view;
  private boolean isDelete;
  private List<TimeLine> timeLineList;
  private List<DiaryComment> commentList;
  private List<DiaryItem> itemList;
  private Long like;



  public DiaryResponseDto of(Diary diary) {
    return DiaryResponseDto.builder()
            .id(diary.getId())
            .title(diary.getTitle())
//            .timeLineList(diary.getCustomer().getTimeLineList())
            .content(diary.getContent())
            .customer(diary.getCustomer())
            .joinDate(diary.getJoinDate())
            .updateTime(diary.getUpdateTime())
            .view(diary.getView())
            .isDelete(diary.isDelete())
            .build();
  }






}
