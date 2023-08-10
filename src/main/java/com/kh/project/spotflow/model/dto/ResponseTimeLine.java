package com.kh.project.spotflow.model.dto;

import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.model.entity.TimeLine;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ResponseTimeLine {
    private long id;
    private String image;
    private int view;
    private String content;
    private LocalDateTime joinDate;
    private LocalDateTime updateTime;
    private Customer customer;
    private String place;
    private boolean isDelete;
    private Double lat;
    private Double lng;

    public ResponseTimeLine of(TimeLine timeLine) {
        return ResponseTimeLine.builder()
                .id(timeLine.getId())
                .image(timeLine.getImage())
                .content(timeLine.getContent())
                .customer(timeLine.getCustomer())
                .joinDate(timeLine.getJoinDate())
                .updateTime(timeLine.getUpdateTime())
                .view(timeLine.getView())
                .isDelete(timeLine.isDelete())
                .place(timeLine.getPlace())
                .lat(timeLine.getLat())
                .lng(timeLine.getLng())
                .build();
    }

}
