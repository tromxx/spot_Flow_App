package com.kh.project.spotflow.controller;

import com.kh.project.spotflow.model.dto.Follow.FollowUserRequestDto;
import com.kh.project.spotflow.model.dto.Follow.FollowerRequestDto;
import com.kh.project.spotflow.model.dto.Follow.FollowUserResponseDto;
import com.kh.project.spotflow.service.FollowService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
@Slf4j
public class FollowController {
     
     private final FollowService followService;
     
     @PostMapping("/following")
     public ResponseEntity<Boolean> setFollowing(@RequestBody FollowerRequestDto followerRequestDto) {
          return new ResponseEntity<>(followService.setFollowing(followerRequestDto), HttpStatus.OK);
     }
     
     @GetMapping("/userFollowing")
     public ResponseEntity<List<FollowUserResponseDto>> getUserFollowing() {
          return new ResponseEntity<>(followService.getUserFollowing(), HttpStatus.OK);
     }
     
     @GetMapping("/userFollower")
     public ResponseEntity<List<FollowUserResponseDto>> getUserFollower() {
          return new ResponseEntity<>(followService.getUserFollower(), HttpStatus.OK);
     }
     
     @PostMapping("/delFollowing")
     public ResponseEntity<Map<String, Object>> delFollowing(@RequestBody FollowerRequestDto followerRequestDto) {
          return new ResponseEntity<>(followService.delFollowing(followerRequestDto), HttpStatus.OK);
     }
     
     @PostMapping("/setFollowUp")
     public ResponseEntity<FollowUserRequestDto> setFollowUp(@RequestBody FollowerRequestDto followerRequestDto) {
          return new ResponseEntity<>(followService.setFollowUp(followerRequestDto), HttpStatus.OK);
     }
     
     @GetMapping("/testing")
     public ResponseEntity<Boolean> testing(@RequestParam String email) {
          return new ResponseEntity<>(followService.checkFollowing(email),HttpStatus.OK);
     }
     

}
