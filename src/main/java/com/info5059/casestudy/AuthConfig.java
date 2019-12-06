package com.info5059.casestudy;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@Configuration
@EnableWebSecurity
public class AuthConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .passwordEncoder(encoder())
                .withUser("case2")
                .password(encodePassword("c2"))
                .roles("USER");
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                 //.authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/**").permitAll() // development
                .authorizeRequests().antMatchers("/*.*","/static/**","/","/assets/**").permitAll() // production
                .anyRequest().authenticated()
                .and()
                .httpBasic();
    }
    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public String encodePassword(String pw) {
        BCryptPasswordEncoder enc = new BCryptPasswordEncoder();
        return enc.encode(pw);
    }
}
