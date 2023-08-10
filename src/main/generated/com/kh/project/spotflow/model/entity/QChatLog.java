package com.kh.project.spotflow.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatLog is a Querydsl query type for ChatLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatLog extends EntityPathBase<ChatLog> {

    private static final long serialVersionUID = 1554242283L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatLog chatLog = new QChatLog("chatLog");

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> date = createDateTime("date", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isDelete = createBoolean("isDelete");

    public final QChatRoom roomId;

    public final QCustomer sender;

    public QChatLog(String variable) {
        this(ChatLog.class, forVariable(variable), INITS);
    }

    public QChatLog(Path<? extends ChatLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatLog(PathMetadata metadata, PathInits inits) {
        this(ChatLog.class, metadata, inits);
    }

    public QChatLog(Class<? extends ChatLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.roomId = inits.isInitialized("roomId") ? new QChatRoom(forProperty("roomId")) : null;
        this.sender = inits.isInitialized("sender") ? new QCustomer(forProperty("sender")) : null;
    }

}

