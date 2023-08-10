package com.kh.project.spotflow.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNotification is a Querydsl query type for Notification
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNotification extends EntityPathBase<Notification> {

    private static final long serialVersionUID = 441442860L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNotification notification = new QNotification("notification");

    public final QDiary diary;

    public final QDiaryComment diaryComment;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isRead = createBoolean("isRead");

    public final QCustomer receiver;

    public final QCustomer sender;

    public QNotification(String variable) {
        this(Notification.class, forVariable(variable), INITS);
    }

    public QNotification(Path<? extends Notification> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNotification(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNotification(PathMetadata metadata, PathInits inits) {
        this(Notification.class, metadata, inits);
    }

    public QNotification(Class<? extends Notification> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.diary = inits.isInitialized("diary") ? new QDiary(forProperty("diary"), inits.get("diary")) : null;
        this.diaryComment = inits.isInitialized("diaryComment") ? new QDiaryComment(forProperty("diaryComment"), inits.get("diaryComment")) : null;
        this.receiver = inits.isInitialized("receiver") ? new QCustomer(forProperty("receiver")) : null;
        this.sender = inits.isInitialized("sender") ? new QCustomer(forProperty("sender")) : null;
    }

}

