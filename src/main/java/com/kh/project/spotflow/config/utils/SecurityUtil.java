package com.kh.project.spotflow.config.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
  private SecurityUtil() {} // 해당 클래스가 객체로 생성되는걸 방지하기 위한 코드
  public static String getCustomerEmail() {
    final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    
    if (authentication == null || authentication.getName() == null) {
      throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
    }
    
    return authentication.getName();
  }
}

