package com.kh.project.spotflow.controller;

import com.kh.project.spotflow.model.dto.comment.CommentRequest;
import com.kh.project.spotflow.model.dto.comment.CommentResponse;
import com.kh.project.spotflow.model.dto.comment.CommentUpdateRequest;
import com.kh.project.spotflow.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/diary/comment")
@RequiredArgsConstructor
@Slf4j
@RestController
public class DiaryCommentController {
  private final CommentService commentService;

  @PostMapping("")
  public ResponseEntity<CommentResponse> saveComment(@RequestBody CommentRequest request) {
    return new ResponseEntity<>(commentService.saveComment(request), HttpStatus.OK);
  }

  @PutMapping("")
  public ResponseEntity<CommentResponse> updateComment(@RequestBody CommentUpdateRequest request) {
    return new ResponseEntity<>(commentService.updateComment(request), HttpStatus.OK);
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<CommentResponse> deleteComment(@PathVariable Long id) {
    return new ResponseEntity<>(commentService.deleteComponent(id), HttpStatus.OK);
  }
}
