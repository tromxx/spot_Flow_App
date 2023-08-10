package com.kh.project.spotflow.model.dto.diary;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiaryResponseAllDto {
     private Long id;
     private String title;
     private String email;
     private String nickname;
     private String profilePic;
     private Long like;
     private int view;
     private LocalDateTime date;
     private List<String> img;
}
