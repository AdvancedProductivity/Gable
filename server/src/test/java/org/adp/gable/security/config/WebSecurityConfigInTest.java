package org.adp.gable.security.config;

import org.adp.gable.security.filter.JwtAuthenticationFilter;
import org.adp.gable.security.filter.JwtTokenHandleFilter;
import org.adp.gable.security.filter.LanguageFilter;
import org.adp.gable.security.handler.NoTokenProviderHandler;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import java.util.Arrays;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author zzq
 */

@Configuration
@EnableWebSecurity
@Profile("SECURITY_MOCK")
public class WebSecurityConfigInTest extends WebSecurityConfig {

    @Bean
    public LocaleResolver localeResolver() {
        AcceptHeaderLocaleResolver slr = new AcceptHeaderLocaleResolver();
        slr.setDefaultLocale(Locale.US);
        slr.setSupportedLocales(Arrays.asList(Locale.US, Locale.SIMPLIFIED_CHINESE));
        return slr;
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
                .addFilterBefore(new LanguageFilter(localeResolver()), JwtAuthenticationFilter.class)
                .addFilterAfter(new JwtTokenHandleFilter(authenticationManager(), objectMapper), JwtAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/api/user/testConfigP").hasAnyAuthority("sec_createUser")
                .antMatchers("/api/user/testConfigR").hasRole("SUPPER_ROLE")
                .antMatchers("/static/**", "/all/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .logout()
                .permitAll();

    }
}