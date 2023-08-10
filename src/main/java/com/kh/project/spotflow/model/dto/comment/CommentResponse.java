package com.kh.project.spotflow.model.dto.comment;

import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.model.entity.Diary;
import com.kh.project.spotflow.model.entity.DiaryComment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class CommentResponse {
  private Diary diary;
  private String content;
  private Customer customer; // 댓글 게시자
  private LocalDateTime joinDate;
  private boolean isDelete;

  public CommentResponse of(DiaryComment diaryComment) {
    return CommentResponse.builder()
            .diary(diaryComment.getDiary())
            .customer(diaryComment.getCustomer())
            .content(diaryComment.getContent())
            .joinDate(diaryComment.getJoinDate())
            .isDelete(diaryComment.isDelete())
            .build();
  }
}
