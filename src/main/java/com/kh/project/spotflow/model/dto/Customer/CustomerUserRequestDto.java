package com.kh.project.spotflow.model.dto.Customer;

import com.kh.project.spotflow.model.constant.Theme;
import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.model.entity.Diary;
import com.kh.project.spotflow.model.entity.TimeLine;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class CustomerUserRequestDto {
     //회원 정보 조히 Dto
     private String email;
     private String nickName;
     private String statMsg;
     private String profilePic;
     private Theme theme;
     
     public static CustomerUserRequestDto getCustomerInfo(Customer customer) {
          return CustomerUserRequestDto.builder()
            .email(customer.getEmail())
            .nickName(customer.getNickName())
            .statMsg(customer.getStatMsg())
            .profilePic(customer.getProfilePic())
            .theme(customer.getTheme())
            .build();
     }
}
