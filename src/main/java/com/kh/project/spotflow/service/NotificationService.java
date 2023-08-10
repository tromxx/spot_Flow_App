package com.kh.project.spotflow.service;

import com.kh.project.spotflow.controller.SseController;
import com.kh.project.spotflow.model.dto.ResponseNotification;
import com.kh.project.spotflow.model.dto.comment.CommentRequest;
import com.kh.project.spotflow.model.dto.comment.CommentResponse;
import com.kh.project.spotflow.model.dto.diary.request.DiaryLikeRequest;
import com.kh.project.spotflow.model.dto.like.likeNotice;
import com.kh.project.spotflow.model.entity.*;
import com.kh.project.spotflow.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final CustomerRepository customerRepository;
    private final AuthService authService;
    private final DiaryRepository diaryRepository;
    private final LikeRepository likeRepository;
    private final DiaryCommentRepository commentRepository;
    private final Map<String, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    public void addSseEmitter(String joinDate, SseEmitter sseEmitter) {
        sseEmitters.put(joinDate, sseEmitter);
        sseEmitter.onCompletion(() -> sseEmitters.remove(joinDate));
        sseEmitter.onTimeout(() -> sseEmitters.remove(joinDate));
        sseEmitter.onError((e) -> sseEmitters.remove(joinDate));
    }

    public SseEmitter getSseEmitter(String email) {
        return sseEmitters.get(email);
    }

    public void notifyEvent(String email) {
        if (sseEmitters.containsKey(email)) {
            SseEmitter sseEmitter = sseEmitters.get(email);
            log.info(String.valueOf(sseEmitter));
            try {
                sseEmitter.send(SseEmitter.event().name("addComment").data("새 알림이 있습니다"));
            } catch (Exception e) {
                sseEmitters.remove(email);
            }
        }
    }


    public List<ResponseNotification> findMyNotice(HttpServletRequest request) {
        Customer customer = authService.getCustomerByEmail();
        log.info(customer.toString());
        List<Notification> notificationList = notificationRepository.findByReceiverOrderByIdDesc(customer);
        log.info(notificationList.toString());

        List<ResponseNotification> responseList = new ArrayList<>();

        for (Notification e : notificationList) {
            ResponseNotification responseNotification = new ResponseNotification().of(e);
            responseList.add(responseNotification);
        }

        return responseList;
    }


    @Transactional
    public void update(List<ResponseNotification> request) {
        List<Notification> notificationList = new ArrayList<>();
        for (ResponseNotification current : request) {
            if (!current.isRead()) {
                Notification notification = notificationRepository.findNotificationById(current.getId());
                notification.setRead(true);
                notificationList.add(notification);
            }
        }
        if (notificationList.size() > 0) {
            notificationRepository.saveAll(notificationList);
        }
    }
    @Transactional
    public ResponseNotification save(CommentRequest request) {
        Diary diary = diaryRepository.findDiaryById(request.getDiary());
        Customer sender = authService.getCustomerByEmail();
        DiaryComment comment = request.toComment(sender, diary);

        Customer receiver = customerRepository.findCustomerByEmail(diary.getCustomer().getEmail());

        Notification notification = Notification.builder()
                .receiver(receiver)
                .diary(diary)
                .sender(sender)
                .diaryComment(comment)
                .isRead(false)
                .build();

        notificationRepository.save(notification);

        return new ResponseNotification().of(notification);
    }

    public likeNotice likeNotice(DiaryLikeRequest request) {
        Like like = likeRepository.findLikeById(request.getId());
        Customer sender = authService.getCustomerByEmail();
        Diary diary = like.getDiary();
        Customer receiver = diary.getCustomer();

//        Notification = Notification.builder()
//                .receiver(receiver)
//                .diary(diary)
//                .sender(sender)
//                .diaryComment(comment)
//                .isRead(false)
//                .build();

//        likeNotice notice = new likeNotice().of(no)
 return null;
    }
    @Transactional
    public Notification saveComment(CommentRequest request) {
        Diary diary = diaryRepository.findDiaryById(request.getDiary());
        Customer sender = authService.getCustomerByEmail();
        DiaryComment comment = request.toComment(sender, diary);
        commentRepository.save(comment);

        Customer receiver = customerRepository.findCustomerByEmail(diary.getCustomer().getEmail());

        Notification notification = Notification.builder()
                .receiver(receiver)
                .diary(diary)
                .sender(sender)
                .diaryComment(comment)
                .isRead(false)
                .build();

        notificationRepository.save(notification);

        return notification;
    }

    public void sendNotice(String joinDate, Map<String, SseEmitter> map) {

        if (sseEmitters.containsKey(joinDate)) {
            SseEmitter sseEmitter = sseEmitters.get(joinDate);
            log.info(String.valueOf(sseEmitter));
            try {
                sseEmitter.send(SseEmitter.event().name("addComment").data("새 알림이 있습니다"));
            } catch (Exception e) {
                sseEmitters.remove(joinDate);
            }
        }
    }
}
