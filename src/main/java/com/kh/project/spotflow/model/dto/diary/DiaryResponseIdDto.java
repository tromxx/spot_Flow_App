package com.kh.project.spotflow.model.dto.diary;


import com.kh.project.spotflow.model.entity.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiaryResponseIdDto {
    private Long id;
    private String title;
    private String content;
    private boolean isDelete;
    private List<DiaryItem> itemList;


    public static DiaryResponseIdDto ofTitleItemList(Diary diary) {
        List<DiaryItem> itemList = diary.getItemList();

        return DiaryResponseIdDto.builder()
                .id(diary.getId())
                .title(diary.getTitle())
                .isDelete(diary.isDelete())
                .content(diary.getContent())
                .itemList(itemList)
                .build();
    }


}


