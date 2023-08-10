package com.kh.project.spotflow.repository;

import com.kh.project.spotflow.model.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
  
  // 사용자 정보 불러오기
  Optional<Customer> findByEmail(String email);
  
  // 이메일 중복 확인
  boolean existsByEmail(String email);
  
  // 닉네임 중복 확인
  boolean existsByNickName(String nickName);

  // 유저정보 찾기
  Customer findCustomerByEmail(String email);
}

