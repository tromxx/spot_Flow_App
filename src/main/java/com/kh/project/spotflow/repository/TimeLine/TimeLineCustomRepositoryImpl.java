package com.kh.project.spotflow.repository.TimeLine;


import com.kh.project.spotflow.model.entity.TimeLine;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

import static com.kh.project.spotflow.model.entity.QTimeLine.timeLine;

public class TimeLineCustomRepositoryImpl extends QuerydslRepositorySupport implements TimeLineCustomRepository {
     
     private final JPAQueryFactory queryFactory;
     
     public TimeLineCustomRepositoryImpl(JPAQueryFactory queryFactory) {
          super(TimeLine.class);
          this.queryFactory = queryFactory;
     }
     
     @Override
     public List<TimeLine> findWithNoOffset(Long lastTimelineId, int limit) {
          return queryFactory
            .selectFrom(timeLine)
            .where(ltTimeLineId(lastTimelineId))
            .orderBy(timeLine.id.desc())
            .limit(limit)
            .fetch();
     }
     
     private BooleanExpression ltTimeLineId(Long lastTimelineId) {
          if (lastTimelineId == null) {
               return null;
          }
          
          return timeLine.id.lt(lastTimelineId);
     }
}