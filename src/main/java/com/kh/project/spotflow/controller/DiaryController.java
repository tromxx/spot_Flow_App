package com.kh.project.spotflow.controller;

import com.kh.project.spotflow.model.dto.TimeLine.TimeLineRequestDto;
import com.kh.project.spotflow.model.dto.diary.DiaryResponseAllDto;
import com.kh.project.spotflow.model.dto.diary.request.DiaryCreateRequest;
import com.kh.project.spotflow.model.dto.diary.DiaryResponseDto;
import com.kh.project.spotflow.model.dto.diary.request.DiaryDeleteRequest;
import com.kh.project.spotflow.model.dto.diary.request.DiaryLikeRequest;
import com.kh.project.spotflow.model.dto.diary.request.DiaryUpdateRequest;
import com.kh.project.spotflow.model.entity.Diary;
import com.kh.project.spotflow.model.entity.Like;
import com.kh.project.spotflow.service.DiaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequestMapping("/diary")
@RequiredArgsConstructor
@Slf4j
@RestController
public class DiaryController {
  private final DiaryService diaryService;

  // 다이어리 식별값만 받아서 상세 데이터를 제공
  @GetMapping("")
  public ResponseEntity<DiaryResponseDto> findDiary(@RequestParam("num") Long num) {
    return new ResponseEntity<>(diaryService.findDiaryById(num), HttpStatus.OK);
  }

  @GetMapping("/all")
  public ResponseEntity<List<DiaryResponseDto>> findAllDiary() {
    return new ResponseEntity<>(diaryService.findDiaryAll(), HttpStatus.OK);
  }

  // 특정 유저가 작성한 다이어리를 모두 제공 (포함된 타임라인은 제공하지 않기 때문에 위 상세데이터는 따로 가져와야 함)
  @GetMapping("/user")
  public ResponseEntity<List<DiaryResponseDto>> findByMyDiaryList(@RequestParam("email") String email) {
    return new ResponseEntity<>(diaryService.findDiaryByMember(email), HttpStatus.OK);
  }

  @GetMapping("/my-diary")
  public ResponseEntity<List<DiaryResponseDto>> findByMyDiaryList() {
    return new ResponseEntity<>(diaryService.findDiaryByMember(), HttpStatus.OK);
  }

  // 체크한값들 삭제
  @PostMapping("/check")
  public ResponseEntity<List<DiaryResponseDto>> deleteMyDiarys(@RequestBody DiaryDeleteRequest request) {
    return new ResponseEntity<>(diaryService.checkDelete(request.getId()), HttpStatus.OK);
  }

  // 특정 다이어리를 삭제처리
  @DeleteMapping("")
  public  ResponseEntity<DiaryResponseDto> deleteMyDiary(@RequestBody DiaryUpdateRequest diaryRequest) {
    return new ResponseEntity<>(diaryService.delete(diaryRequest),HttpStatus.OK);
  }

  // 특정 다이어리의 포함된 타임라인 리스트, 타이틀, 컨텐츠를 변경
  @PutMapping("")
  public  ResponseEntity<DiaryResponseDto> updateMyDiary(@RequestBody DiaryUpdateRequest diaryRequest) {
    return new ResponseEntity<>(diaryService.update(diaryRequest),HttpStatus.OK);
  }

  // 다이어리 생성
  @PostMapping("")
  public ResponseEntity<Diary> save(@RequestBody DiaryCreateRequest requestDto) {
    return new ResponseEntity<>(diaryService.save(requestDto), HttpStatus.OK);
  }
  // 조회수 1up
  @PutMapping("/view")
  public ResponseEntity<DiaryResponseDto> viewUp(@RequestBody DiaryUpdateRequest request) {
    return new ResponseEntity<>(diaryService.viewUp(request), HttpStatus.OK);
  }
  // 좋아요 1up
  @PutMapping("/like")
  public ResponseEntity<Integer> likeUp(@RequestBody DiaryLikeRequest request) {
    return new ResponseEntity<>(diaryService.likeControl(request), HttpStatus.OK);
  }

  // 좋아요 여부 확인
  @GetMapping("/like/{id}")
  public ResponseEntity<Like> findLikeInfo(@PathVariable Long id) {
    return new ResponseEntity<>(diaryService.likeInfo(id), HttpStatus.OK);
  }

  // 좋아요 집계
  @GetMapping("/like/count")
  public ResponseEntity<Long> countLike(@RequestParam("id") Long id) {
    return new ResponseEntity<>(diaryService.countLike(id), HttpStatus.OK);
  }

  //팔로우한 유저 다이어리 검색
  @GetMapping("/following")
  public ResponseEntity<List<Diary>> friendDiary() {
    return new ResponseEntity<>(diaryService.friendDiaryList() , HttpStatus.OK);
  }


  // 특정 다이어리를 삭제처리

  @PostMapping("/search")
  public ResponseEntity<List<DiaryResponseDto>> searchDiary(@RequestBody TimeLineRequestDto request) {
    String place = request.getPlace();
    return new ResponseEntity<>(diaryService.findDiaryByFlow(place),HttpStatus.OK);
  }

  
  @GetMapping("/alls")
  public ResponseEntity<List<DiaryResponseAllDto>> getAllDiary(){
    return new ResponseEntity<>(diaryService.findAllDiary(), HttpStatus.OK);
  }
}
