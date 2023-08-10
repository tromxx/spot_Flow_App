package com.kh.project.spotflow.repository;

import com.kh.project.spotflow.model.entity.Diary;
import com.kh.project.spotflow.model.entity.DiaryItem;
import com.kh.project.spotflow.model.entity.TimeLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryItemRepository extends JpaRepository<DiaryItem, Long> {
  List<DiaryItem> findByDiary(Diary diary);
  DiaryItem findByDiaryAndTimeLine(Diary diary, TimeLine timeLine);
}
