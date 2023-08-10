package com.kh.project.spotflow.model.dto.TimeLine;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
public class TimeLineMyRequestDto {
     private Double lat;
     private Double lng;
     private String content;
     private String img;
     private String place;
}
