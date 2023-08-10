package com.kh.project.spotflow.repository;

import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.model.entity.Diary;
import com.kh.project.spotflow.model.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
  List<Like> findLikeByDiary(Diary diary);
  Like findLikeByCustomerAndDiary(Customer customer, Diary diary);

//  @Query("")
  Long countLikeByDiary(Diary diary);

  Like findLikeById(Long id);

}
