package com.kh.project.spotflow.controller;

import com.kh.project.spotflow.model.dto.ResponseNotification;
import com.kh.project.spotflow.model.dto.chat.ChatMessage;
import com.kh.project.spotflow.model.dto.comment.CommentRequest;
import com.kh.project.spotflow.model.dto.comment.CommentResponse;
import com.kh.project.spotflow.model.dto.diary.DiaryResponseDto;
import com.kh.project.spotflow.model.dto.diary.request.DiaryCreateRequest;
import com.kh.project.spotflow.model.dto.diary.request.DiaryUpdateRequest;
import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.model.entity.Diary;
import com.kh.project.spotflow.model.entity.DiaryItem;
import com.kh.project.spotflow.model.entity.Notification;
import com.kh.project.spotflow.repository.DiaryRepository;
import com.kh.project.spotflow.service.AuthService;
import com.kh.project.spotflow.service.CommentService;
import com.kh.project.spotflow.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@RequestMapping("/notification")
@RequiredArgsConstructor
@Slf4j
@RestController
public class NotificationController {
    private final NotificationService notificationService;
    private final SimpMessagingTemplate messagingTemplate;
    private final DiaryRepository diaryRepository;
    private final AuthService authService;
    private final CommentService commentService;


    @PutMapping("/updatestatus")
    public void updateNotification(@RequestBody List<ResponseNotification> request) {
        notificationService.update(request);
    }
    // 알림 모두 불러오기
    @PostMapping("/getall")
    public ResponseEntity<List<ResponseNotification>> getAll(HttpServletRequest request) {

        return new ResponseEntity<>(notificationService.findMyNotice(request), HttpStatus.OK);
    }

    
    @PostMapping("/comment")
    public void sendCommentNoti(@RequestBody CommentRequest request) {

        Long diaryNumber = request.getDiary();
        Diary diary = diaryRepository.findDiaryById(request.getDiary());
        Customer receiver = diary.getCustomer();
        String joinDate = receiver.getJoinDate().toString();
        notificationService.notifyEvent(joinDate);


//        return new ResponseEntity<>(notificationService.save(request),  HttpStatus.OK);
    }

//    @MessageMapping("/sendnoti/")
//    public void sendNotification(@Payload CommentRequest request) {
//        Customer sender = authService.getCustomerByEmail();
//        Customer receiver = diaryRepository.findDiaryById(request.getDiary()).getCustomer();
//        Notification response = notificationService.saveComment(request);
//        log.info("알림 기능 작동");
//        log.info(receiver.getEmail());
//        messagingTemplate.convertAndSend("/notification/"+ receiver.getEmail(), response);
//    }
    @GetMapping("/ssetest")
    public void sseTest(@RequestParam String email) {
        log.info(email);
        notificationService.notifyEvent(email);
    }
}
