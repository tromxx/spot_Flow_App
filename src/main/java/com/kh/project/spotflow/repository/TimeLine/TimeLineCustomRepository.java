package com.kh.project.spotflow.repository.TimeLine;

import com.kh.project.spotflow.model.entity.TimeLine;

import java.util.List;

// 무한 스코롤 기능을 우한 interface
public interface TimeLineCustomRepository {
     List<TimeLine> findWithNoOffset(Long lastTimeLineId, int limit);
}
