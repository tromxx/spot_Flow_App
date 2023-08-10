package com.kh.project.spotflow.model.dto.chat;

import com.kh.project.spotflow.model.entity.TimeLine;
import lombok.*;
import net.bytebuddy.asm.Advice;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class MyFlowRequestDto {
    private String content;
    private String img;
    private String place;
    private Double lat;
    private Double lng;


    public TimeLine toTimeline() {
        return TimeLine.builder()
                .lat(this.lat)
                .lng(this.lng)
                .content(this.content)
                .place(this.place)
                .image(this.img)
                .joinDate(LocalDateTime.now())
                .view(0)
                .build();
    }

}
