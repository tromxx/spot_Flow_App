package com.kh.project.spotflow.model.dto.TimeLine;

import com.kh.project.spotflow.model.entity.TimeLine;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public class TimeLineSummaryDto {
        private Long id;
        private String content;
        private String image;

        public static TimeLineSummaryDto fromTimeLine(TimeLine timeLine) {
            return TimeLineSummaryDto.builder()
                    .id(timeLine.getId())
                    .content(timeLine.getContent())
                    .image(timeLine.getImage())
                    .build();
        }

        public static List<TimeLineSummaryDto> fromTimeLineList(List<TimeLine> timeLineList) {
            return timeLineList.stream()
                    .map(TimeLineSummaryDto::fromTimeLine)
                    .collect(Collectors.toList());
        }

    }

