package org.adp.gable.security.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.adp.gable.SupperUser;
import org.adp.gable.security.utils.JwtConst;
import org.adp.gable.security.utils.SecurityErrorResult;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.Resource;

import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@WebAppConfiguration
public class I18nControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Resource
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    @DisplayName("test language of en_US")
    public void testEnUsLanguage() throws Exception {
        assertNotNull(mvc);

        HttpHeaders headers = new HttpHeaders();
        headers.setAcceptLanguageAsLocales(Collections.singletonList(Locale.US));
        MvcResult mvcResult = mvc
                .perform(MockMvcRequestBuilders.get(JwtConst.LOGIN_PATH)
                        .queryParam("username", SupperUser.USER_EMAIL)
                        .queryParam("password", "bfdsml")
                        .locale(Locale.US)
                        .headers(headers)
                        .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                ).andExpect(status().isOk()).andReturn();
        final String contentType = mvcResult.getResponse().getContentType();
        assertEquals(contentType, MediaType.APPLICATION_JSON_UTF8_VALUE);
        String contentAsString = mvcResult.getResponse().getContentAsString();
        assertNotNull(contentAsString);
        assertNotEquals(contentAsString.length(), 0);
        final JsonNode jsonNode = objectMapper.readTree(contentAsString);
        assertEquals(SecurityErrorResult.PASSWORD_ERROR.getErrorCode(), jsonNode.path("code").asInt());
        assertEquals("Password Not Correct", jsonNode.path("message").asText());
        assertNull(LocaleContextHolder.getLocaleContext());

    }

    @Test
    @DisplayName("test language of zh-Cn")
    public void testZhCnLanguage() throws Exception {
        assertNotNull(mvc);


        HttpHeaders headers = new HttpHeaders();
        headers.setAcceptLanguageAsLocales(Collections.singletonList(Locale.SIMPLIFIED_CHINESE));

        MvcResult mvcResult = mvc
                .perform(MockMvcRequestBuilders.get(JwtConst.LOGIN_PATH)
                        .queryParam("username", SupperUser.USER_EMAIL)
                        .queryParam("password", "bfdsml")
                        .headers(headers)
                        .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                ).andExpect(status().isOk()).andReturn();
        final String contentType = mvcResult.getResponse().getContentType();
        assertEquals(contentType, MediaType.APPLICATION_JSON_UTF8_VALUE);
        String contentAsString = mvcResult.getResponse().getContentAsString();
        assertNotNull(contentAsString);
        assertNotEquals(contentAsString.length(), 0);
        final JsonNode jsonNode = objectMapper.readTree(contentAsString);
        assertEquals(SecurityErrorResult.PASSWORD_ERROR.getErrorCode(), jsonNode.path("code").asInt());
        assertEquals("密码错误", jsonNode.path("message").asText());
        assertNull(LocaleContextHolder.getLocaleContext());


    }
}
