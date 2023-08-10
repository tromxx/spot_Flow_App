package com.kh.project.spotflow.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDiaryComment is a Querydsl query type for DiaryComment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDiaryComment extends EntityPathBase<DiaryComment> {

    private static final long serialVersionUID = 1436633693L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDiaryComment diaryComment = new QDiaryComment("diaryComment");

    public final StringPath content = createString("content");

    public final QCustomer customer;

    public final QDiary diary;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isDelete = createBoolean("isDelete");

    public final DateTimePath<java.time.LocalDateTime> joinDate = createDateTime("joinDate", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> update = createDateTime("update", java.time.LocalDateTime.class);

    public QDiaryComment(String variable) {
        this(DiaryComment.class, forVariable(variable), INITS);
    }

    public QDiaryComment(Path<? extends DiaryComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDiaryComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDiaryComment(PathMetadata metadata, PathInits inits) {
        this(DiaryComment.class, metadata, inits);
    }

    public QDiaryComment(Class<? extends DiaryComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.customer = inits.isInitialized("customer") ? new QCustomer(forProperty("customer")) : null;
        this.diary = inits.isInitialized("diary") ? new QDiary(forProperty("diary"), inits.get("diary")) : null;
    }

}

