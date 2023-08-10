package com.kh.project.spotflow.controller;

import com.kh.project.spotflow.model.dto.Customer.CustomerUpdateDto;
import com.kh.project.spotflow.model.dto.Customer.CustomerUserRequestDto;
import com.kh.project.spotflow.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/customer")
public class CustomerController {
     private final CustomerService customerService;
     
     // customer 정보 가죠오기
     @GetMapping("/profile")
     public ResponseEntity<Map<String, Object>> getCustomerProfile() {
          Map<String,Object> customerData = customerService.getCustomerInfo();
          if (customerData != null) return new ResponseEntity<>(customerData, HttpStatus.OK);
          else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     }


     // customer 닉네임으로 정보가져오기 (개인프로필 접근)
     @GetMapping("/profile/{email}")
     public ResponseEntity<Map<String, Object>> getCustomerProfileById(@PathVariable String email) {
          Map<String,Object> customerData = customerService.getCustomerInfoById(email);
          if (customerData != null) return new ResponseEntity<>(customerData, HttpStatus.OK);
          else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     }


     // customer 상테메시지 수정
     @PutMapping("/updatestatmsg")
     public ResponseEntity<CustomerUserRequestDto> updateCustomerStatMsg(@RequestBody CustomerUpdateDto customerUpdateDto) {
          CustomerUserRequestDto customerUserRequestDto = customerService.updateStatMsg(customerUpdateDto);
          if(customerUserRequestDto != null) return new ResponseEntity<>(customerUserRequestDto, HttpStatus.OK);
          else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     }
     
     // customer 프로필 사진 수정
     @PutMapping("/updateprofilepic")
     public ResponseEntity<CustomerUserRequestDto> updateCustomerProfilePic(@RequestBody CustomerUpdateDto customerUpdateDto) {
          CustomerUserRequestDto customerUserRequestDto = customerService.updateProfilePic(customerUpdateDto);
          if(customerUserRequestDto != null) return new ResponseEntity<>(customerUserRequestDto, HttpStatus.OK);
          else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     }
     
     @PutMapping("/updateprofile")
     public ResponseEntity<CustomerUserRequestDto> updatreCustomerProfile(@RequestBody CustomerUpdateDto customerUpdateDto){
          CustomerUserRequestDto customerUserRequestDto = customerService.updateProfile(customerUpdateDto);
          if(customerUserRequestDto != null) return new ResponseEntity<>(customerUserRequestDto, HttpStatus.OK);
          else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     }
}
