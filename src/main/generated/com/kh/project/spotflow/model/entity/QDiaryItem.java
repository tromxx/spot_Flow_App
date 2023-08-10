package com.kh.project.spotflow.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDiaryItem is a Querydsl query type for DiaryItem
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDiaryItem extends EntityPathBase<DiaryItem> {

    private static final long serialVersionUID = -1103245355L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDiaryItem diaryItem = new QDiaryItem("diaryItem");

    public final QDiary diary;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QTimeLine timeLine;

    public QDiaryItem(String variable) {
        this(DiaryItem.class, forVariable(variable), INITS);
    }

    public QDiaryItem(Path<? extends DiaryItem> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDiaryItem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDiaryItem(PathMetadata metadata, PathInits inits) {
        this(DiaryItem.class, metadata, inits);
    }

    public QDiaryItem(Class<? extends DiaryItem> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.diary = inits.isInitialized("diary") ? new QDiary(forProperty("diary"), inits.get("diary")) : null;
        this.timeLine = inits.isInitialized("timeLine") ? new QTimeLine(forProperty("timeLine"), inits.get("timeLine")) : null;
    }

}

