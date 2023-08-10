package com.kh.project.spotflow.model.dto.Customer;
import com.kh.project.spotflow.model.constant.OpenStatus;
import com.kh.project.spotflow.model.dto.TimeLine.TimeLineSummaryDto;
import com.kh.project.spotflow.model.dto.diary.DiaryResponseDto;
import com.kh.project.spotflow.model.dto.diary.DiaryResponseIdDto;
import com.kh.project.spotflow.model.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class CustomerByIdRequestDto {
    //개별 프로필 접근할때의 회원 정보 조회 Dto
    private String email;

    private String nickName;
    private String statMsg;
    private String profilePic;
    private OpenStatus openStatus;
    private List<TimeLineSummaryDto> timeLineList;
    private List<DiaryResponseIdDto> diaryList;

    public static CustomerByIdRequestDto getCustomerInfo(Customer customer) {
        List<TimeLineSummaryDto> timeLineList = customer.getTimeLineList().stream()
                .map(TimeLineSummaryDto::fromTimeLine)
                .collect(Collectors.toList());

        List<DiaryResponseIdDto> diaryList = customer.getDiaryList().stream()
                .map(DiaryResponseIdDto::ofTitleItemList)
                .collect(Collectors.toList());

        return CustomerByIdRequestDto.builder()
                .nickName(customer.getNickName())
                .statMsg(customer.getStatMsg())
                .timeLineList(timeLineList)
                .openStatus(customer.getOpenStatus())
                .diaryList(diaryList)
                .email(customer.getEmail())
                .profilePic(customer.getProfilePic())
                .build();
    }
}


