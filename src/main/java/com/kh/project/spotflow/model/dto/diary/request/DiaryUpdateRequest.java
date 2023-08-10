package com.kh.project.spotflow.model.dto.diary.request;

import com.kh.project.spotflow.model.dto.TimeLine.TimeLineRequestDto;
import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class DiaryUpdateRequest {
  private Long id;
  private String title;
  private String content;
  private List<TimeLineRequestDto> timeLineList;
}
