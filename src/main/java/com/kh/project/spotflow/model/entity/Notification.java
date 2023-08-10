package com.kh.project.spotflow.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Notification")
@Entity
public class Notification {

    @Id
    @Column(name = "noti_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "receiver")
    private Customer receiver;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "sender")
    private Customer sender;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "diaryTitle")
    private Diary diary;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonManagedReference
    @JoinColumn(name = "comment")
    private DiaryComment diaryComment;

    private boolean isRead;


    public String toString() {
        return "Notification{" +
                "id=" + id +
                ", receiver=" + receiver +
                ", diary=" + diary +
                ", diaryComment=" + diaryComment +
                ", isRead=" + isRead +
                '}';
    }
}
