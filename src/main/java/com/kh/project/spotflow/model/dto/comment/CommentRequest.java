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
public class CommentRequest {
  private Long diary;
  private String content;

  public DiaryComment toComment(Customer customer, Diary diary) {
    return DiaryComment.builder()
            .diary(diary)
            .customer(customer)
            .content(this.content)
            .joinDate(LocalDateTime.now())
            .isDelete(false)
            .build();
  }
}
