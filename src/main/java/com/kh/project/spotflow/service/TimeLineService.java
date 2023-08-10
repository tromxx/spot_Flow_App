package com.kh.project.spotflow.service;

import com.kh.project.spotflow.config.utils.CookieUtils;
import com.kh.project.spotflow.model.dto.ResponseTimeLine;
import com.kh.project.spotflow.model.dto.TimeLine.*;
import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.model.entity.TimeLine;
import com.kh.project.spotflow.repository.TimeLine.TimeLineRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;

import java.util.*;
import java.util.stream.Collectors;

import static com.kh.project.spotflow.model.dto.TimeLine.TimeLineMyResponseDto.getMyTimeLineInfo;
import static com.kh.project.spotflow.model.entity.QTimeLine.timeLine;

@Slf4j
@Service
@RequiredArgsConstructor
public class TimeLineService {
     private final AuthService authService;
     private final JPAQueryFactory queryFactory;
     private final TimeLineRepository timeLineRepository;
     
     // 타임라인 조회 무한 스크롤 기능
     public List<TimeLineDto> getAll(Long lastTimelineId, int limit) {
          List<TimeLine> timeLineList = timeLineRepository.findWithNoOffset(lastTimelineId, limit);
          List<TimeLineDto> timeLineDtoList = new ArrayList<>();

          return timeLineList.stream()
                  .map(timeLine -> TimeLineDto.builder()
                          .tl_profile_pic(timeLine.getImage())
                          .place(timeLine.getPlace())
                          .content(timeLine.getContent())
                          .view(timeLine.getView())
                          .email(timeLine.getCustomer().getEmail())
                          .updateTime(timeLine.getJoinDate())
                          .nickName(timeLine.getCustomer().getNickName())
                          .ct_profile_pic(timeLine.getCustomer().getProfilePic())
                          .id(timeLine.getId())
                          .build())
                  .collect(Collectors.toList());
     }

    // 타임라인 모두조회
    public List<TimeLineDto> getAll() {
        List<TimeLine> timeLineList = timeLineRepository.findAll();
        List<TimeLineDto> timeLineDtoList = new ArrayList<>();

        return timeLineList.stream()
                .map(timeLine -> TimeLineDto.builder()
                        .tl_profile_pic(timeLine.getImage())
                        .place(timeLine.getPlace())
                        .content(timeLine.getContent())
                        .view(timeLine.getView())
                        .email(timeLine.getCustomer().getEmail())
                        .updateTime(timeLine.getJoinDate())
                        .nickName(timeLine.getCustomer().getNickName())
                        .ct_profile_pic(timeLine.getCustomer().getProfilePic())
                        .id(timeLine.getId())
                        .build())
                .collect(Collectors.toList());
    }
     
     // TimeLine 글 쓰기
     public TimeLine createPost(TimeLineRequestDto requestDto) {
          Customer customer = authService.getCustomerByEmail();
          TimeLine timeLine = TimeLine.builder()
            .customer(customer)
            .place(requestDto.getPlace())
            .lat(requestDto.getLat())
            .lng(requestDto.getLng())
            .content(requestDto.getContent())
            .joinDate(LocalDateTime.now())
            .updateTime(LocalDateTime.now())
            .view(0)
            .image(requestDto.getTl_profile_pic())
            .build();
          return timeLineRepository.save(timeLine);
     }
     
     
     // 타임라인 조회수 증가 서비스
     @Transactional
     public void increaseViewCount(Long id, HttpServletRequest request, HttpServletResponse response) {
          String viewHistory = CookieUtils.getCookieValue(request, "viewHistory");
          Set<String> viewedPosts = new HashSet<>();
          
          if (viewHistory != null && !viewHistory.isEmpty()) {
               viewedPosts.addAll(Arrays.asList(viewHistory.split("\\|"))); // changed from ","
          }
          
          if (!viewedPosts.contains(String.valueOf(id))) {
               TimeLine timeLine = timeLineRepository.findById(id)
                 .orElseThrow(() -> new IllegalArgumentException("해당 포스트가 없습니다. " + id));
               timeLine.setView(timeLine.getView() + 1);
               viewedPosts.add(String.valueOf(id));
               CookieUtils.addCookie(response, "viewHistory", String.join("|", viewedPosts), 24 * 60 * 60); // 1 day cookie, changed from ","
          }
     }
     
     // 타임라인 검색 서비스
     @Transactional
     public List<TimeLineDto> searchPlace(String place) {
          
          List<TimeLine> result = queryFactory.selectFrom(timeLine)
            .where(timeLine.place.contains(place))
            .fetch();
          
          if (result.isEmpty()) {
               log.info("장소가 존재하지않아");
          }
          
          List<TimeLineDto> responseDtoList = result.stream()
            .map(timeline -> TimeLineDto.builder()
              .ct_profile_pic(timeline.getCustomer().getProfilePic())
              .tl_profile_pic(timeline.getImage())
              .place(timeline.getPlace())
              .nickName(timeline.getCustomer().getNickName())
              .view(timeline.getView())
              .id(timeline.getId())
              .updateTime(timeline.getJoinDate())
              .content(timeline.getContent())
              .build()
            )
            .collect(Collectors.toList());
          
          return responseDtoList;
     }

    public List<ResponseTimeLine> findAll() {
       List<TimeLine> timeLineList = timeLineRepository.findAll();
       List<ResponseTimeLine> responseTimeLineList = new ArrayList<>();
       for (TimeLine timeLine : timeLineList) {
         ResponseTimeLine responseTimeLine = new ResponseTimeLine().of(timeLine);
         responseTimeLineList.add(responseTimeLine);
       }
       return responseTimeLineList;
    }
    
    // 나의 개인 timeline 전달
     public List<TimeLineMyResponseDto> getMyTimeLine() {
          Customer customer = authService.getCustomerByEmail();
          List<TimeLine> timeLineList = timeLineRepository.findByCustomerAndIsDeleteFalseOrderByIdDesc(customer);
          List<TimeLineMyResponseDto> timeLineMyRequestDtoList = new ArrayList<>();
          for (TimeLine timeLine : timeLineList) {
               TimeLineMyResponseDto dto = getMyTimeLineInfo(timeLine);
               timeLineMyRequestDtoList.add(dto);
          }
          return timeLineMyRequestDtoList;
     }
     
     //타임라인 저장
     public List<TimeLineMyResponseDto> saveTimeLine(TimeLineMyRequestDto timeLineMyRequestDto) {
          Customer customer = authService.getCustomerByEmail();
          TimeLine timeLine = new TimeLine();
          timeLine.setCustomer(customer);
          timeLine.setLat(timeLineMyRequestDto.getLat());
          timeLine.setLng(timeLineMyRequestDto.getLng());
          timeLine.setContent(timeLineMyRequestDto.getContent());
          timeLine.setImage(timeLineMyRequestDto.getImg());
          timeLine.setPlace(timeLineMyRequestDto.getPlace());
          timeLine.setView(0);
          timeLine.setJoinDate(LocalDateTime.now());
          timeLine.setDelete(false);
          timeLineRepository.save(timeLine);
          return getMyTimeLine();
     }

    @Transactional
    public  List<TimeLineMyResponseDto> delete(TimeLineMyUpdateDto updateDto) {
        Long[] ids = updateDto.getId();
        for(Long id : ids) {
            TimeLine timeLine = timeLineRepository.findTimeLineById(id);
            timeLine.setDelete(true);
            timeLineRepository.save(timeLine);
        }

        return getMyTimeLine();
    }
}
