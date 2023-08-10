package com.kh.project.spotflow.model.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class CommentUpdateRequest {
  private Long comment;
  private String content;
}
