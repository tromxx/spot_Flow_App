package com.kh.project.spotflow.repository.Chat;

import com.kh.project.spotflow.model.entity.ChatRoom;
import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.model.entity.RoomMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomMapperRepository extends JpaRepository<RoomMapper, Long> {
  @Query("select r from ChatRoom r, RoomMapper m where m.customer = :sender and r.id = m.chatRoom.id")
  List<ChatRoom> findChatRoom(@Param("sender") Customer sender);

  List<RoomMapper> findRoomMapperByChatRoom(ChatRoom room);
}
