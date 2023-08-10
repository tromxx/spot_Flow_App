package com.kh.project.spotflow.model.dto.Token;

import lombok.*;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
@Builder
public class TokenDto {
  private String grantType;
  private String accessToken;
  private Long tokenExpiresIn;
}
