package com.kh.project.spotflow.service;

import com.kh.project.spotflow.model.dto.Follow.FollowUserRequestDto;
import com.kh.project.spotflow.model.dto.Follow.FollowerRequestDto;
import com.kh.project.spotflow.model.dto.Follow.FollowUserResponseDto;
import com.kh.project.spotflow.model.entity.Customer;
import com.kh.project.spotflow.model.entity.Follow;
import com.kh.project.spotflow.repository.CustomerRepository;
import com.kh.project.spotflow.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class FollowService {
     private final AuthService authService;
     private final CustomerRepository customerRepository;
     private final FollowRepository followRepository;
     
     // 팔로워 수 (follower)
     public Long getFollower(Customer customer) {
          return followRepository.countByFollower(customer);
     }
     // 팔로잉 수 (following)
     public Long getFollowing(Customer customer){
          return followRepository.countByFollowing(customer);
     }
     
     
     public Boolean setFollowing(FollowerRequestDto followerRequestDto) {
          Customer follower = customerRepository.findCustomerByEmail(followerRequestDto.getEmail());
          Customer following = authService.getCustomerByEmail();
          Follow follow = new Follow();
          follow.setFollower(follower);
          follow.setFollowing(following);
          follow.setJoinDate(LocalDateTime.now());
          follow.setCheckFollow(false);
          followRepository.save(follow);
          return true;
     }
     
     //유저 팔로워 하는 사람들 정보
     @Transactional
     public List<FollowUserResponseDto> getUserFollowing() {
          Customer user = authService.getCustomerByEmail();
          List<Follow> followList = followRepository.findByFollowing(user);
          List<String> followingList = new ArrayList<>();
          for (int i = 0; i < followList.size(); i++) {
               followingList.add(followList.get(i).getFollower().getEmail());
          }
          List<Customer> customerList = new ArrayList<>();
          for (int i = 0; i < followingList.size(); i++) {
               log.info(followingList.get(i));
               Customer customer = customerRepository.findCustomerByEmail(followingList.get(i));
               customerList.add(customer);
          }
          List<FollowUserResponseDto> followingUserDtoList = new ArrayList<>();
          for (int i = 0; i < customerList.size(); i++) {
               FollowUserResponseDto followingUserDto = new FollowUserResponseDto();
               followingUserDto.setId(followList.get(i).getId());
               followingUserDto.setEmail(customerList.get(i).getEmail());
               followingUserDto.setNickname(customerList.get(i).getNickName());
               followingUserDto.setProfilePic(customerList.get(i).getProfilePic());
               followingUserDtoList.add(followingUserDto);
          }
          return followingUserDtoList;
     }
     
     //유저 팔로워 하는 사람들 정보
     @Transactional
     public List<FollowUserResponseDto> getUserFollower() {
          Customer user = authService.getCustomerByEmail();
          List<Follow> followList = followRepository.findByFollower(user);
          List<String> followingList = new ArrayList<>();
          for (int i = 0; i < followList.size(); i++) {
               followingList.add(followList.get(i).getFollowing().getEmail());
          }
          List<Customer> customerList = new ArrayList<>();
          for (int i = 0; i < followingList.size(); i++) {
               log.info(followingList.get(i));
               Customer customer = customerRepository.findCustomerByEmail(followingList.get(i));
               customerList.add(customer);
          }
          List<FollowUserResponseDto> followingUserDtoList = new ArrayList<>();
          for (int i = 0; i < customerList.size(); i++) {
               FollowUserResponseDto followingUserDto = new FollowUserResponseDto();
               followingUserDto.setId(followList.get(i).getId());
               followingUserDto.setEmail(customerList.get(i).getEmail());
               followingUserDto.setNickname(customerList.get(i).getNickName());
               followingUserDto.setProfilePic(customerList.get(i).getProfilePic());
               followingUserDto.setIsFollowUp(followList.get(i).isCheckFollow());
               followingUserDtoList.add(followingUserDto);
          }
          return followingUserDtoList;
     }
     
     
     // 팔로잉 하고 있는 유저 정보 삭제하기
     public Map<String, Object> delFollowing(FollowerRequestDto followerRequestDto) {
          Follow follow = followRepository.findById(followerRequestDto.getId()).orElseThrow(()-> new IllegalArgumentException("해당 데이터 없음"));
          followRepository.delete(follow);
          Customer following = authService.getCustomerByEmail();
          Customer follower = customerRepository.findByEmail(followerRequestDto.getEmail()).orElseThrow(() -> new IllegalArgumentException("해당 데이터 없음"));
          FollowUserRequestDto followUserRequestDto = new FollowUserRequestDto();
          Follow delfollow = followRepository.findByFollowingAndFollower(follower, following);
          log.info(String.valueOf(delfollow.getId()));
          delfollow.setCheckFollow(false);
          followRepository.save(delfollow);
          Map<String, Object> getNewFollowing = new HashMap<>();
          followUserRequestDto.setFollower(getFollower(following));
          followUserRequestDto.setFollowing(getFollowing(following));
          getNewFollowing.put("count" , followUserRequestDto);
          getNewFollowing.put("following", getUserFollowing());
          return getNewFollowing;
     }
     
     //팔로우 하고 있는 유저 맞 팔로우 하기
     @Transactional
     public FollowUserRequestDto setFollowUp(FollowerRequestDto followerRequestDto) {
          Customer follower = customerRepository.findCustomerByEmail(followerRequestDto.getEmail());
          Customer following = authService.getCustomerByEmail();
          Follow follow = followRepository.findById(followerRequestDto.getId()).orElseThrow(() -> new RuntimeException("데이터가 없음"));
          follow.setCheckFollow(true);
          followRepository.save(follow);
          Follow setfollow = new Follow();
          setfollow.setFollower(follower);
          setfollow.setFollowing(following);
          setfollow.setJoinDate(LocalDateTime.now());
          setfollow.setCheckFollow(true);
          followRepository.save(setfollow);
          FollowUserRequestDto followUserRequestDto = new FollowUserRequestDto();
          Customer customer = authService.getCustomerByEmail();
          followUserRequestDto.setFollowing(getFollowing(customer));
          followUserRequestDto.setFollower(getFollower(customer));
          return followUserRequestDto;
     }
     
     // 해당 유저가 following 중인지 확인하는 서비스 로직
     public boolean checkFollowing(String email) {
          Customer following = authService.getCustomerByEmail();
          Customer follower = customerRepository.findCustomerByEmail(email);
          return followRepository.existsByFollowerAndFollowing(follower, following);
     }
}
