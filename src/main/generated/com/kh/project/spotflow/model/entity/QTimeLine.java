package com.kh.project.spotflow.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTimeLine is a Querydsl query type for TimeLine
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTimeLine extends EntityPathBase<TimeLine> {

    private static final long serialVersionUID = 1717070370L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTimeLine timeLine = new QTimeLine("timeLine");

    public final StringPath content = createString("content");

    public final QCustomer customer;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final BooleanPath isDelete = createBoolean("isDelete");

    public final ListPath<DiaryItem, QDiaryItem> itemList = this.<DiaryItem, QDiaryItem>createList("itemList", DiaryItem.class, QDiaryItem.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> joinDate = createDateTime("joinDate", java.time.LocalDateTime.class);

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final NumberPath<Double> lng = createNumber("lng", Double.class);

    public final StringPath place = createString("place");

    public final DateTimePath<java.time.LocalDateTime> updateTime = createDateTime("updateTime", java.time.LocalDateTime.class);

    public final NumberPath<Integer> view = createNumber("view", Integer.class);

    public QTimeLine(String variable) {
        this(TimeLine.class, forVariable(variable), INITS);
    }

    public QTimeLine(Path<? extends TimeLine> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTimeLine(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTimeLine(PathMetadata metadata, PathInits inits) {
        this(TimeLine.class, metadata, inits);
    }

    public QTimeLine(Class<? extends TimeLine> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.customer = inits.isInitialized("customer") ? new QCustomer(forProperty("customer")) : null;
    }

}

