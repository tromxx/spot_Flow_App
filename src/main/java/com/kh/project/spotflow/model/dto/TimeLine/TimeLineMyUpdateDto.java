package com.kh.project.spotflow.model.dto.TimeLine;

import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class TimeLineMyUpdateDto {
    private Long[] id;

//    @JsonSetter("id")
//    public void setStringIds(String[] ids) {
//        // Convert string array to Long array
//        this.id = new Long[ids.length];
//        for (int i = 0; i < ids.length; i++) {
//            this.id[i] = Long.parseLong(ids[i]);
//        }
}