package com.kh.project.spotflow.model.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kh.project.spotflow.model.dto.diary.DiaryResponseDto;
import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.model.entity.Diary;
import com.kh.project.spotflow.model.entity.DiaryComment;
import com.kh.project.spotflow.model.entity.Notification;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
public class ResponseNotification {
    private String receiver;
    private String diary;
    private String comment;

    private String sender;

    private Long id;
    private boolean isRead;

    public ResponseNotification of(Notification notification) {
        String comment = notification.getDiaryComment() != null ? notification.getDiaryComment().getContent() : null;
        return ResponseNotification.builder()
                .id(notification.getId())
                .receiver(notification.getSender().getNickName())
                .diary(notification.getDiary().getTitle())
                .sender(notification.getSender().getNickName())
                .comment(comment)
                .isRead(notification.isRead())
                .build();
    }

}
