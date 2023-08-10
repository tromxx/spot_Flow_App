package com.kh.project.spotflow.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCustomer is a Querydsl query type for Customer
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCustomer extends EntityPathBase<Customer> {

    private static final long serialVersionUID = 105882015L;

    public static final QCustomer customer = new QCustomer("customer");

    public final EnumPath<com.kh.project.spotflow.model.constant.Authority> authority = createEnum("authority", com.kh.project.spotflow.model.constant.Authority.class);

    public final ListPath<DiaryComment, QDiaryComment> commentList = this.<DiaryComment, QDiaryComment>createList("commentList", DiaryComment.class, QDiaryComment.class, PathInits.DIRECT2);

    public final ListPath<Diary, QDiary> diaryList = this.<Diary, QDiary>createList("diaryList", Diary.class, QDiary.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final ListPath<Follow, QFollow> followerList = this.<Follow, QFollow>createList("followerList", Follow.class, QFollow.class, PathInits.DIRECT2);

    public final ListPath<Follow, QFollow> followingList = this.<Follow, QFollow>createList("followingList", Follow.class, QFollow.class, PathInits.DIRECT2);

    public final ListPath<Follow, QFollow> followList = this.<Follow, QFollow>createList("followList", Follow.class, QFollow.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> joinDate = createDateTime("joinDate", java.time.LocalDateTime.class);

    public final ListPath<Like, QLike> likeList = this.<Like, QLike>createList("likeList", Like.class, QLike.class, PathInits.DIRECT2);

    public final StringPath nickName = createString("nickName");

    public final EnumPath<com.kh.project.spotflow.model.constant.OpenStatus> openStatus = createEnum("openStatus", com.kh.project.spotflow.model.constant.OpenStatus.class);

    public final StringPath password = createString("password");

    public final StringPath profilePic = createString("profilePic");

    public final StringPath statMsg = createString("statMsg");

    public final EnumPath<com.kh.project.spotflow.model.constant.Theme> theme = createEnum("theme", com.kh.project.spotflow.model.constant.Theme.class);

    public final ListPath<TimeLine, QTimeLine> timeLineList = this.<TimeLine, QTimeLine>createList("timeLineList", TimeLine.class, QTimeLine.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> updateTime = createDateTime("updateTime", java.time.LocalDateTime.class);

    public QCustomer(String variable) {
        super(Customer.class, forVariable(variable));
    }

    public QCustomer(Path<? extends Customer> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCustomer(PathMetadata metadata) {
        super(Customer.class, metadata);
    }

}

