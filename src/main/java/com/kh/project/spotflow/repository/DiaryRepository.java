package com.kh.project.spotflow.repository;

import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.model.entity.Diary;
import com.kh.project.spotflow.model.entity.TimeLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
  List<Diary> findDiaryByCustomerOrderByJoinDateDesc(Customer customer);
  Diary findDiaryById(Long id);
  @Query("select d from Diary d, Follow f where f.follower = :follower and d.customer = f.following")
  List<Diary> findDiaryByFollowing(@Param("follower") Customer follower);

  @Query("SELECT DISTINCT d FROM Diary d JOIN d.itemList di WHERE di.timeLine IN :timeLines")
  List<Diary> findDiaryByTimeLines(@Param("timeLines") List<TimeLine> timeLines);
  
  List<Diary> findAllByIsDeleteFalse();
}
