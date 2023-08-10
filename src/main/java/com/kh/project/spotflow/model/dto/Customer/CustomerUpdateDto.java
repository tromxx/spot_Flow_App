package com.kh.project.spotflow.model.dto.Customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor

public class CustomerUpdateDto {
     // 회원 정보 수정 Dto
     private String statMsg;
     private String profilePic;
}
