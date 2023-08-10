package com.kh.project.spotflow.service;

import com.kh.project.spotflow.model.dto.Customer.CustomerByIdRequestDto;
import com.kh.project.spotflow.model.dto.Customer.CustomerUpdateDto;
import com.kh.project.spotflow.model.dto.Customer.CustomerUserRequestDto;
import com.kh.project.spotflow.model.dto.Follow.FollowUserRequestDto;
import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomerService {
     private final CustomerRepository customerRepository;
     private final AuthService authService;
     private final FollowService followService;
     
     //회원 정보 조회
     public Map<String, Object> getCustomerInfo() {
          Customer customer = authService.getCustomerByEmail();
          Map<String, Object> customerData = new HashMap<>();
          FollowUserRequestDto followUserRequestDto = new FollowUserRequestDto();
          followUserRequestDto.setFollower(followService.getFollower(customer));
          followUserRequestDto.setFollowing(followService.getFollowing(customer));
          customerData.put("customer", CustomerUserRequestDto.getCustomerInfo(customer));
          customerData.put("follower", followUserRequestDto);
          customerData.put("joinDate", customer.getJoinDate().toString());
          log.info(customer.getJoinDate().toString());
          return customerData;
     }

     //회원 정보 조회 이메일으로 개인프로필 접근
     public Map<String, Object> getCustomerInfoById(String email) {
          Customer customer = customerRepository.findByEmail(email)
                  .orElseThrow(() -> new NoSuchElementException("없는 유저의 id: " + email));
          Map<String, Object> customerData = new HashMap<>();
          FollowUserRequestDto followUserRequestDto = new FollowUserRequestDto();
          followUserRequestDto.setFollower(followService.getFollower(customer));
          followUserRequestDto.setFollowing(followService.getFollowing(customer));
          customerData.put("customer", CustomerByIdRequestDto.getCustomerInfo(customer));
          customerData.put("follower", followUserRequestDto);
          return customerData;
     }



     //회원 상테메시지 수정
     public CustomerUserRequestDto updateStatMsg(CustomerUpdateDto customerUpdateDto) {
          Customer customer = authService.getCustomerByEmail();
          customer.setStatMsg(customerUpdateDto.getStatMsg());
          customerRepository.save(customer);
          return CustomerUserRequestDto.getCustomerInfo(customer);
     }
     
     //회원 프로필 사진 수정
     public CustomerUserRequestDto updateProfilePic(CustomerUpdateDto customerUpdateDto) {
          Customer customer = authService.getCustomerByEmail();
          customer.setProfilePic(customerUpdateDto.getProfilePic());
          customerRepository.save(customer);
          return CustomerUserRequestDto.getCustomerInfo(customer);
     }
     
     public CustomerUserRequestDto updateProfile(CustomerUpdateDto customerUpdateDto) {
          Customer customer = authService.getCustomerByEmail();
          customer.setProfilePic(customerUpdateDto.getProfilePic());
          customer.setStatMsg(customerUpdateDto.getStatMsg());
          return CustomerUserRequestDto.getCustomerInfo(customer);
     }

     // 특정 유저정보 조회
     @Transactional
     public Customer userInfo(String email) {
          return customerRepository.findCustomerByEmail(email);
     }
}
