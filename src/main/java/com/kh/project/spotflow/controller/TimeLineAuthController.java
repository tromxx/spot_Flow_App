package com.kh.project.spotflow.controller;

import com.kh.project.spotflow.model.dto.TimeLine.TimeLineDto;
import com.kh.project.spotflow.model.dto.TimeLine.TimeLineRequestDto;
import com.kh.project.spotflow.service.TimeLineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/auth/timeline")
public class TimeLineAuthController {
     private final TimeLineService timeLineService;
     
     // 서버에서 처리하는 조회수 증가
     @PutMapping("/{postId}/views")
     public ResponseEntity<Void> increaseViewCount(@PathVariable Long postId, HttpServletRequest request, HttpServletResponse response) {
          timeLineService.increaseViewCount(postId, request, response);
          return ResponseEntity.ok().build();
     }
     
     // 타임라인 검색
     @GetMapping("/search")
     public List<TimeLineDto> searchPlace(@RequestParam String place) {
          TimeLineRequestDto request = new TimeLineRequestDto();
          request.setPlace(place);
          return timeLineService.searchPlace(place);
     }
     
     // 타임라인 글 가져오기 무한스크롤
     @GetMapping("/getall")
     public ResponseEntity<List<TimeLineDto>> testing(@RequestParam(value ="lastTimeLineId" , required = false) Long lastTimeLineId){
          List<TimeLineDto> result = timeLineService.getAll(lastTimeLineId,4);
          return new ResponseEntity<>(result, HttpStatus.OK);
     }

     // 타임라인 다 가져오기
     @GetMapping("/All")
     public ResponseEntity<List<TimeLineDto>> testing() {
          List<TimeLineDto> result = timeLineService.getAll();
          return new ResponseEntity<>(result, HttpStatus.OK);
     }
}


