package com.kh.project.spotflow.model.dto.diary.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DiaryDeleteRequest {
    private List<Long> id ;
}