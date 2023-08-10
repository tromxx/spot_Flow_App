package com.kh.project.spotflow.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoomMapper is a Querydsl query type for RoomMapper
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoomMapper extends EntityPathBase<RoomMapper> {

    private static final long serialVersionUID = 992448637L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoomMapper roomMapper = new QRoomMapper("roomMapper");

    public final QChatRoom chatRoom;

    public final QCustomer customer;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QRoomMapper(String variable) {
        this(RoomMapper.class, forVariable(variable), INITS);
    }

    public QRoomMapper(Path<? extends RoomMapper> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoomMapper(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoomMapper(PathMetadata metadata, PathInits inits) {
        this(RoomMapper.class, metadata, inits);
    }

    public QRoomMapper(Class<? extends RoomMapper> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoom = inits.isInitialized("chatRoom") ? new QChatRoom(forProperty("chatRoom")) : null;
        this.customer = inits.isInitialized("customer") ? new QCustomer(forProperty("customer")) : null;
    }

}

