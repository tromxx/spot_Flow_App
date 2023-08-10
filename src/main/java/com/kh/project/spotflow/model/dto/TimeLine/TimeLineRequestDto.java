package com.kh.project.spotflow.model.dto.TimeLine;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class TimeLineRequestDto {
     private Long id; 
     private String tl_profile_pic;
     private String content;
     private String place;
     private double lat;
     private double lng;
}