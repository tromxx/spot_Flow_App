package com.kh.project.spotflow.model.dto.like;

import com.kh.project.spotflow.model.dto.ResponseNotification;
import com.kh.project.spotflow.model.entity.Like;
import com.kh.project.spotflow.model.entity.Notification;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class likeNotice {
    private String sender;
    private String receiver;
    private String diary;
    private Long id;
    private boolean isRead;
    public likeNotice of(Notification notification, Like like) {
//        log.info(notification.getDiaryWriter().getNickName());
//        log.info(notification.getCommentWriter().getEmail());
//        log.info(notification.getDiary().getTitle());
        return likeNotice.builder()
                .id(notification.getId())
                .receiver(notification.getReceiver().getNickName())
                .sender(like.getCustomer().getEmail())
                .diary(notification.getDiary().getTitle())
                .isRead(notification.isRead())
                .build();
    }
}
