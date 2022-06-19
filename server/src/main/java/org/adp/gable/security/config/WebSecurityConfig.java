package org.adp.gable.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.adp.gable.security.filter.JwtAuthenticationFilter;
import org.adp.gable.security.filter.JwtTokenHandleFilter;
import org.adp.gable.security.handler.CustomAccessDeniedHandler;
import org.adp.gable.security.handler.NoTokenProviderHandler;
import org.adp.gable.security.service.JwtUserServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.Locale;

/**
 * @author zzq
 */
@Configuration
@EnableWebSecurity
@Profile("!SECURITY_MOCK")
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Resource
    protected ObjectMapper objectMapper;

    @Resource
    private JwtUserServiceImpl jwtUserService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new NoTokenProviderHandler(objectMapper))
                .accessDeniedHandler(accessDeniedHandler())
                .and()
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), objectMapper))
                .addFilterAfter(new JwtTokenHandleFilter(authenticationManager(), objectMapper), JwtAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/static/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .logout()
                .permitAll();

    }


    @Bean
    protected PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    protected AccessDeniedHandler accessDeniedHandler() {
        return new CustomAccessDeniedHandler(objectMapper);
    }

    public static void main(String[] args) {
        System.out.println( new BCryptPasswordEncoder().encode("123456"));
    }
    public void setObjectMapper(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public void setJwtUserService(JwtUserServiceImpl jwtUserService) {
        this.jwtUserService = jwtUserService;
    }
}
