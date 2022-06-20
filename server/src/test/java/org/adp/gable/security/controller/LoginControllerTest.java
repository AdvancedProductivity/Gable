package org.adp.gable.security.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.adp.gable.SupperUser;
import org.adp.gable.common.web.ErrorResult;
import org.adp.gable.security.service.JwtUserServiceImpl;
import org.adp.gable.security.utils.JwtConst;
import org.adp.gable.security.utils.SecurityErrorResult;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ContextConfiguration
@WebAppConfiguration
public class LoginControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Resource
    private ObjectMapper objectMapper;

    @Resource
    private JwtUserServiceImpl jwtUserService;

    @BeforeEach
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    @DisplayName("test login with error password")
    public void testErrorPassword(){

        assertNotNull(mvc);
        assertDoesNotThrow(() -> {

            MvcResult mvcResult = mvc
                    .perform(MockMvcRequestBuilders.get(JwtConst.LOGIN_PATH)
                            .queryParam("username", SupperUser.USER_EMAIL)
                            .queryParam("password", "bfdsml")
                    ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertNotNull(contentAsString);
            assertNotEquals(contentAsString.length(), 0);
            assertEquals(SecurityErrorResult.PASSWORD_ERROR.getErrorCode(), objectMapper.readTree(contentAsString).path("code").asInt());

        });

    }

    @Test
    @DisplayName("test login with collect password")
    public void testCollectPassword(){

        assertNotNull(mvc);
        assertDoesNotThrow(() -> {

            MvcResult mvcResult = mvc
                    .perform(MockMvcRequestBuilders.get(JwtConst.LOGIN_PATH)
                            .queryParam("username", SupperUser.USER_EMAIL)
                            .queryParam("password", SupperUser.PASSWORD)
                    ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertNotNull(contentAsString);
            assertNotEquals(contentAsString.length(), 0);
            final JsonNode returnJson = objectMapper.readTree(contentAsString);
            assertEquals(ErrorResult.SUCCESS_CODE, returnJson.path("code").asInt());
            assertFalse(returnJson.path("data").isNull());
            assertTrue(returnJson.path("data").isObject());
            assertTrue(returnJson.path("data").path("authorities").isArray());
        });

    }

}
