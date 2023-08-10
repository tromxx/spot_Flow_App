package com.kh.project.spotflow.repository.Chat;

import com.kh.project.spotflow.model.entity.ChatLog;
import com.kh.project.spotflow.model.entity.ChatRoom;
import com.kh.project.spotflow.model.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLog, Long> {
  Optional<ChatLog> findById(Long id);
  List<ChatLog> findByRoomIdOrderByDateDesc(ChatRoom room);
}
