package com.kh.project.spotflow.repository.Chat;

import com.kh.project.spotflow.model.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
  ChatRoom findChatRoomById(String id);
}
