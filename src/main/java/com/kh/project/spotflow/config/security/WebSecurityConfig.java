package com.kh.project.spotflow.config.security;

import com.kh.project.spotflow.config.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@Component
@RequiredArgsConstructor
public class WebSecurityConfig implements WebMvcConfigurer {
  private final TokenProvider tokenProvider;
  private final JWTAuthenticationEntryPoint jwtAuthenticationEntryPoint;
  private final JWTAccessDeniedHandler jwtAccessDeniedHandler;
  
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
            .httpBasic().disable() // HTTP 기본 인증을 하지 않도록 설정
            .csrf().disable() // 위변조 관련 보호 정책을 비활성화
            // 세션을 사용하지 않고, 상태를 유지하지 않는 세션관리 정책을 설정
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

            .and()
            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .accessDeniedHandler(jwtAccessDeniedHandler)

            .and()
            .authorizeRequests()
            // 경로에 대해 인증 없이 접근을 허용
            .antMatchers("/auth/**", "/api/**", "/diary/**", "/timeline/**","/", "/static/**").permitAll()
            .antMatchers("/chat/**", "/ws/**", "/sub/**").permitAll()
            .antMatchers("/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/swagger-ui/**" ,"/webjars/**", "/swagger/**", "/sign-api/exception").permitAll()
            .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .anyRequest().authenticated()

            .and()
            .apply(new JWTSecurityConfig(tokenProvider));

    return http.build();
  }
  
}
