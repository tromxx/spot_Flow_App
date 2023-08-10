package com.kh.project.spotflow.model.dto.TimeLine;

import com.kh.project.spotflow.model.entity.TimeLine;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor @NoArgsConstructor
@Builder

// 나의 개인 타임라인 조회 Dto
public class TimeLineMyResponseDto {
     private long id;
     private String img;
     private LocalDateTime date;
     private String content;
     private String location;
     private boolean isDelete;
     
     public static TimeLineMyResponseDto getMyTimeLineInfo(TimeLine timeLine) {
          return TimeLineMyResponseDto.builder()
            .id(timeLine.getId())
            .img(timeLine.getImage())
            .date(timeLine.getJoinDate())
            .content(timeLine.getContent())
            .location(timeLine.getPlace())
            .build();
     }
     public TimeLineMyResponseDto of(TimeLine timeLine) {
          return TimeLineMyResponseDto.builder()
                  .id(timeLine.getId())
                  .img(timeLine.getImage())
                  .date(timeLine.getJoinDate())
                  .content(timeLine.getContent())
                  .location(timeLine.getPlace())
                  .isDelete(timeLine.isDelete())
                  .build();
     }
}
