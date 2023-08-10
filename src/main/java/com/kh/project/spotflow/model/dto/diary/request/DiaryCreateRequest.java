package com.kh.project.spotflow.model.dto.diary.request;

import com.kh.project.spotflow.model.dto.TimeLine.TimeLineRequestDto;
import com.kh.project.spotflow.model.entity.Diary;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder @ToString
public class DiaryCreateRequest {
  private String title;
  private String content;
  private List<Long> timeLineId;
  private List<TimeLineRequestDto> timeLineList;

  public Diary toDiary() {
    return Diary.builder()
            .title(this.title)
            .content(this.content)
            .joinDate(LocalDateTime.now())
            .view(0)
            .isDelete(false)
            .build();
  }
}
