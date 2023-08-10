package com.kh.project.spotflow.service;

import com.kh.project.spotflow.config.utils.SecurityUtil;
import com.kh.project.spotflow.model.dto.Customer.CustomerRequestDto;
import com.kh.project.spotflow.model.dto.Token.TokenDto;
import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.config.jwt.TokenProvider;
import com.kh.project.spotflow.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
  private final AuthenticationManagerBuilder managerBuilder;
  private final CustomerRepository customerRepository;
  private final PasswordEncoder passwordEncoder;
  private final TokenProvider tokenProvider;
  
  //이메일 중복 체크
  public boolean checkEmailDuplicate(String email) {
    return customerRepository.existsByEmail(email);
  }
  
  //닉네임 중복 체크
  public boolean checkNickNameDuplicate(String nickName) {
    return customerRepository.existsByNickName(nickName);
  }
  
  // 회원 가입
  public boolean signup(CustomerRequestDto requestDto) {
    if (customerRepository.existsByEmail(requestDto.getEmail())) {
      return false;
    }else {
      Customer customer = requestDto.toMember(passwordEncoder);
      customerRepository.save(customer);
      return true;
    }
  }
  
  //로그인시 토큰값 전달
  public TokenDto login(CustomerRequestDto requestDto) {
    UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
    Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
    return tokenProvider.generateTokenDto(authentication);
  }
  
  //토근검증후 로그인 정보 고융하기
  public Customer getCustomerByEmail(){
    String email = SecurityUtil.getCustomerEmail();
    return customerRepository.findByEmail(email).orElseThrow(()-> new IllegalArgumentException("해당 사용자가 없음"));
  }
  
  // 임시 비밀번호
  public boolean setTempPwd(String tempPwd, String email) {
    try {
      Customer customer = customerRepository.findByEmail(email)
        .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없음"));
      String encodedPwd = passwordEncoder.encode(tempPwd);
      customer.setPassword(encodedPwd);
      customerRepository.save(customer);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  }