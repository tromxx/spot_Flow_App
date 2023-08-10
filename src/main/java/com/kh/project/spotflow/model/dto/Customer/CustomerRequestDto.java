package com.kh.project.spotflow.model.dto.Customer;

import com.kh.project.spotflow.model.constant.Authority;
import com.kh.project.spotflow.model.constant.OpenStatus;
import com.kh.project.spotflow.model.constant.Theme;
import com.kh.project.spotflow.model.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class CustomerRequestDto {
  //로그인 회원가입 Dto
  private String email;
  private String password;
  private String nickName;

  public Customer toMember(PasswordEncoder passwordEncoder) {
    return Customer.builder()
            .email(email)
            .password(passwordEncoder.encode(password))
            .nickName(nickName)
            .profilePic("https://firebasestorage.googleapis.com/v0/b/spotflow-5475a.appspot.com/o/default_avatar.png?alt=media&token=7ea670df-ff84-4a85-bdb2-41b9a7f6a77a")
            .openStatus(OpenStatus.PUBLIC)
            .authority(Authority.ROLE_USER)
            .joinDate(LocalDateTime.now())
            .theme(Theme.LIGHT_MODE)
            .build();
  }
  public UsernamePasswordAuthenticationToken toAuthentication() {
    return new UsernamePasswordAuthenticationToken(email, password);
  }
}