package com.kh.project.spotflow.service;

import com.kh.project.spotflow.model.dto.TimeLine.TimeLineRequestDto;
import com.kh.project.spotflow.model.dto.TimeLine.TimeLineSummaryDto;
import com.kh.project.spotflow.model.dto.diary.DiaryResponseAllDto;
import com.kh.project.spotflow.model.dto.diary.request.DiaryCreateRequest;
import com.kh.project.spotflow.model.dto.diary.DiaryResponseDto;
import com.kh.project.spotflow.model.dto.diary.request.DiaryLikeRequest;
import com.kh.project.spotflow.model.dto.diary.request.DiaryUpdateRequest;
import com.kh.project.spotflow.model.entity.*;
import com.kh.project.spotflow.repository.*;
import com.kh.project.spotflow.repository.TimeLine.TimeLineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class DiaryService {
  private final DiaryRepository diaryRepository;
  private final CustomerRepository customerRepository;
  private final TimeLineRepository timeLineRepository;
  private final DiaryItemRepository itemRepository;
  private final LikeRepository likeRepository;
  private final DiaryCommentRepository commentRepository;
  private final NotificationRepository notificationRepository;

  private final NotificationService notificationService;
  private final AuthService authService;

  @Transactional
  public List<DiaryResponseDto> findDiaryAll() {
    List<Diary> diaryList = diaryRepository.findAll();
    List<DiaryResponseDto> responseDtoList = new ArrayList<>();

    for (Diary diary : diaryList) {
      DiaryResponseDto dto = new DiaryResponseDto().of(diary);
      Long likeCount = likeRepository.countLikeByDiary(diary);
      dto.setLike(likeCount);
      responseDtoList.add(dto);
    }

    return responseDtoList;
  }

  // id 값으로 다이어리와 그 다이어리에 포함된 타임라인 들을 리턴하는 메소드
  @Transactional
  public DiaryResponseDto findDiaryById(Long num) {
    Diary diary = diaryRepository.findDiaryById(num); // 다이어리 데이터
    List<DiaryItem> itemList = itemRepository.findByDiary(diary); // 다이어리와 일치하는 매핑 데이터를 가져옴
    DiaryResponseDto responseDto = new DiaryResponseDto().of(diary);
    List<TimeLine> timeLineList = new ArrayList<>();
    List<DiaryComment> commentList = commentRepository.findByDiaryOrderByJoinDateDesc(diary);
    // 다이어리에 포함된 타임라인들을 가져옴
    for (int i = 0; i < itemList.size(); i++) {
      DiaryItem item = itemList.get(i);
      TimeLine timeLine = timeLineRepository.findTimeLineById(item.getTimeLine().getId());
      log.info(timeLine.toString());
      timeLineList.add(timeLine);
    }
    // 다이어리 정보와 그 다이어리에 포함된 타임라인들을 가져옴
    responseDto.setTimeLineList(timeLineList);
    responseDto.setCommentList(commentList);
    return responseDto;
  }

  // 체크된 다이어리 삭제
  @Transactional
  public List<DiaryResponseDto> checkDelete(List<Long> request) {
    List<DiaryResponseDto> responseDtoList = new ArrayList<>();
    for (Long id : request) {
      Diary diary = diaryRepository.findDiaryById(id);
      if (diary != null) {
        diary.setDelete(true);
        diaryRepository.save(diary);
        DiaryResponseDto responseDto = new DiaryResponseDto().of(diary);
        responseDtoList.add(responseDto);
      } else {
        throw new EntityNotFoundException("No Diary found with id: " + id);
      }
    }
    return responseDtoList;
  }


  // user 별 다이어리 검색
  @Transactional
  public List<DiaryResponseDto> findDiaryByMember(String email) {
    Customer customer = customerRepository.findCustomerByEmail(email);
    return getDiaryResponseDtos(customer);
  }

  // 내 다이어리 검색
  @Transactional
  public List<DiaryResponseDto> findDiaryByMember() {
    Customer customer = authService.getCustomerByEmail();
    return getDiaryResponseDtos(customer);
  }

  private List<DiaryResponseDto> getDiaryResponseDtos(Customer customer) {
    List<Diary> diaries = diaryRepository.findDiaryByCustomerOrderByJoinDateDesc(customer);

    List<DiaryResponseDto> diaryDtoList = new ArrayList<>();
    for (Diary diary : diaries) {
      List<TimeLine> timeLines = diary.getItemList().stream()
              .map(DiaryItem::getTimeLine)
              .collect(Collectors.toList());

      diaryDtoList.add(DiaryResponseDto.builder()
              .id(diary.getId())
              .title(diary.getTitle())
              .customer(customer)
              .content(diary.getContent())
              .joinDate(diary.getJoinDate())
              .updateTime(diary.getUpdateTime())
              .like((long) diary.getLikeList().size())
              .view(diary.getView())
              .isDelete(diary.isDelete())
              .timeLineList(timeLines)
              .build());
    }
    return diaryDtoList;
  }



  /*
   * 다이어리 수정
   * 수정할 목록 diaryItem.timeline
   */
  @Transactional
  public DiaryResponseDto update(DiaryUpdateRequest request) {
    // 요청 다이어리
    Diary diary = diaryRepository.findDiaryById(request.getId());
    // 수정 될 다이어리 리스트
    List<DiaryItem> diaryItemList = new ArrayList<>();
    if (diary != null) {
      // 제목 및 글 내용 수정
      diary.setTitle(request.getTitle());
      diary.setContent(request.getContent());
      // 현재 다이어리와 타임라인의 매핑 데이터를 가져옴
      List<DiaryItem> currentItemList = itemRepository.findByDiary(diary);
      for (int i = 0; i < currentItemList.size(); i++) {
        DiaryItem item = currentItemList.get(i);
        item.setTimeLine(
                timeLineRepository.findTimeLineById(
                        request.getTimeLineList()
                                .get(i)
                                .getId()
                )
        );
        diaryItemList.add(item);
      }
      diary.setItemList(diaryItemList);
      diary.setUpdateTime(LocalDateTime.now());
    }
    diaryRepository.save(diary);
    DiaryResponseDto responseDto = new DiaryResponseDto().of(diary);
    responseDto.setItemList(diaryItemList);
    return responseDto;
  }

  @Transactional
  public DiaryResponseDto delete(DiaryUpdateRequest request) {
    Diary diary = diaryRepository.findDiaryById(request.getId());
    diary.setDelete(true);
    diaryRepository.save(diary);
    DiaryResponseDto responseDto = new DiaryResponseDto().of(diary);
    return responseDto;
  }

  // 다이어리와 매핑 테이블을 저장
  @Transactional
  public Diary save(DiaryCreateRequest requestDiary) {
    log.info(requestDiary.toString());
    Customer customer = authService.getCustomerByEmail();
    Diary diary = requestDiary.toDiary();
    List<TimeLineRequestDto> timeLineList = requestDiary.getTimeLineList();
    List<DiaryItem> itemList = new ArrayList<>();
    diary.setCustomer(customer);

    for (int i = 0; i < timeLineList.size(); i++) {
      TimeLine timeLine = timeLineRepository
              .findTimeLineById(timeLineList.get(i).getId());
      DiaryItem item = DiaryItem.builder()
              .diary(diary)
              .timeLine(timeLine)
              .build();
      itemList.add(item);
    }
    diary.setItemList(itemList);

    log.info("Diary 생성");
    diaryRepository.save(diary);

    return diary;
  }

  // 다이어리 조회수 1up
  @Transactional
  public DiaryResponseDto viewUp(DiaryUpdateRequest request) {
    Diary diary = diaryRepository.findDiaryById(request.getId());
    diary.setView(diary.getView() + 1);
    diaryRepository.save(diary);
    DiaryResponseDto responseDto = new DiaryResponseDto().of(diary);
    return responseDto;
  }

  // 다이어리 좋아요 / 이미 좋아요면 좋아요 취소
  @Transactional
  public Integer likeControl(DiaryLikeRequest request) {
    Diary diary = diaryRepository.findDiaryById(request.getId());
    Customer customer = authService.getCustomerByEmail();
    Like currentLike = likeRepository.findLikeByCustomerAndDiary(customer, diary);
    if (currentLike != null) {
      likeRepository.delete(currentLike);
      return 0;
    } else {
      Like like = Like.builder()
              .joinDate(LocalDateTime.now())
              .customer(customer)
              .diary(diary)
              .build();
      likeRepository.save(like);

      // 알림 내용 리포지토리에 저장하는 부분
      Customer receiver = customerRepository.findCustomerByEmail(diary.getCustomer().getEmail());
      Notification notification = Notification.builder()
              .sender(customer)
              .receiver(receiver)
              .diary(diary)
              .diaryComment(null)
              .isRead(false)
              .build();
      notificationRepository.save(notification);

      // 알림 SSE로 수신자에게 전송하는 부분
      String joinDate = receiver.getJoinDate().toString();
      notificationService.notifyEvent(joinDate);

      return 1;
    }

  }

  // 다이어리의 좋아요 집계
  @Transactional
  public Long countLike(Long id) {
    Diary diary = diaryRepository.findDiaryById(id);
    return likeRepository.countLikeByDiary(diary);
  }

  @Transactional
  public List<Diary> friendDiaryList() {
    Customer customer = authService.getCustomerByEmail();
    log.info(customer + "");
    return diaryRepository.findDiaryByFollowing(customer);
  }


  // 타임라인 장소명으로 다이어리 색출
  @Transactional
  public List<DiaryResponseDto> findDiaryByFlow(String request) {

    List<TimeLine> timeLines = timeLineRepository.findByPlace(request);
    List<Diary> diaries = diaryRepository.findDiaryByTimeLines(timeLines);

    List<DiaryResponseDto> diaryDtoList = new ArrayList<>();
    for (Diary diary : diaries) {
      List<TimeLine> timeLineList = diary.getItemList().stream()
              .map(DiaryItem::getTimeLine)
              .collect(Collectors.toList());

      diaryDtoList.add(DiaryResponseDto.builder()
              .id(diary.getId())
              .title(diary.getTitle())
              .content(diary.getContent())
              .customer(diary.getCustomer())
              .joinDate(diary.getJoinDate())
              .updateTime(diary.getUpdateTime())
              .like((long) diary.getLikeList().size())
              .view(diary.getView())
              .isDelete(diary.isDelete())
              .timeLineList(timeLineList)
              .build());
    }
    return diaryDtoList;
  }
  
  @Transactional
  public List<DiaryResponseAllDto> findAllDiary() {
    //전체 데이터 가죠옴
    List<Diary> diaryList = diaryRepository.findAllByIsDeleteFalse();
    //박스 생성
    List<DiaryResponseAllDto> diaryResponseAllDtoList = new ArrayList<>();
    for(Diary diary : diaryList){
      List<TimeLine> timeLineList = diary.getItemList().stream()
        .map(DiaryItem::getTimeLine)
        .collect(Collectors.toList());
      
      DiaryResponseAllDto diaryResponseAllDto = new DiaryResponseAllDto();
      diaryResponseAllDto.setId(diary.getId());
      diaryResponseAllDto.setTitle(diary.getTitle());
      diaryResponseAllDto.setProfilePic(diary.getCustomer().getProfilePic());
      diaryResponseAllDto.setEmail(diary.getCustomer().getEmail());
      diaryResponseAllDto.setNickname(diary.getCustomer().getNickName());
      diaryResponseAllDto.setView(diary.getView());
      diaryResponseAllDto.setDate(diary.getJoinDate());
      diaryResponseAllDto.setLike((long) diary.getLikeList().size());
      List<String> imageList = new ArrayList<>();
      for(TimeLine timeLine : timeLineList){
        String image = timeLine.getImage();
        imageList.add(image);
      }
      diaryResponseAllDto.setImg(imageList);
      diaryResponseAllDtoList.add(diaryResponseAllDto);
    }
    return diaryResponseAllDtoList;
  }



  @Transactional
  public Like likeInfo(Long id) {
    Diary diary = diaryRepository.findDiaryById(id);
    Customer customer = authService.getCustomerByEmail();
    return likeRepository.findLikeByCustomerAndDiary(customer, diary);
  }
}
