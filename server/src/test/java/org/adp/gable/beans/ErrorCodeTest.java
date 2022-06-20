package org.adp.gable.beans;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.adp.gable.SupperUser;
import org.adp.gable.common.web.CommonErrorResult;
import org.adp.gable.security.dtos.UserDto;
import org.adp.gable.security.service.JwtUserServiceImpl;
import org.adp.gable.security.utils.JwtConst;
import org.adp.gable.security.utils.JwtUtils;
import org.adp.gable.security.utils.SecurityErrorResult;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.RandomUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@WebAppConfiguration
public class ErrorCodeTest {

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
    @DisplayName("test return code 500")
    public void testReturnErrorCode500(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {

            HttpHeaders headers = new HttpHeaders();
            headers.setAcceptLanguageAsLocales(Collections.singletonList(Locale.US));
            MvcResult mvcResult = mvc
                    .perform(MockMvcRequestBuilders.get("/api/user/testNPE")
                            .with(user(SupperUser.USER_EMAIL)
                                    .password("pass")
                                    .roles("SUPPER_ROLE", "ADMIN")
                            )
                            .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                    ).andExpect(status().isOk()).andReturn();
            final String contentType = mvcResult.getResponse().getContentType();

            assertEquals(contentType, MediaType.APPLICATION_JSON_UTF8_VALUE);

            String contentAsString = mvcResult.getResponse().getContentAsString();

            assertNotNull(contentAsString);
            assertNotEquals(contentAsString.length(), 0);

            final JsonNode jsonNode = objectMapper.readTree(contentAsString);
            assertEquals(CommonErrorResult.SYSTEM_NPE_ERROR.getErrorCode(), jsonNode.path("code").asInt());

        });
    }

    @Test
    @DisplayName("test return code 200")
    public void testReturnErrorCode200(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {

            MvcResult mvcResult = mvc
                    .perform(MockMvcRequestBuilders.get(JwtConst.LOGIN_PATH)
                            .queryParam("username", RandomStringUtils.random(10, true, true))
                            .queryParam("password", RandomStringUtils.random(8, true, true))
                    ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertNotNull(contentAsString);
            assertNotEquals(contentAsString.length(), 0);
            assertEquals(SecurityErrorResult.USER_NOT_EXIST.getErrorCode(), objectMapper.readTree(contentAsString).path("code").asInt());

        });
    }

    @Test
    @DisplayName("test return code 300")
    public void testReturnErrorCode300(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {

            MvcResult mvcResult = mvc
                    .perform(MockMvcRequestBuilders.get(JwtConst.LOGIN_PATH)
                            .queryParam("username", SupperUser.USER_EMAIL)
                            .queryParam("password", RandomStringUtils.random(8, true, true))
                    ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertNotNull(contentAsString);
            assertNotEquals(contentAsString.length(), 0);
            assertEquals(SecurityErrorResult.PASSWORD_ERROR.getErrorCode(), objectMapper.readTree(contentAsString).path("code").asInt());

        });

    }

    @Test
    @DisplayName("test return code 400")
    public void testReturnErrorCode400(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {

            UserDto userDto = (UserDto) jwtUserService.loadUserByUsername(SupperUser.USER_EMAIL);
            assertNotNull(userDto);
            String token = JwtUtils.generateToken(
                    System.currentTimeMillis() - RandomUtils.nextInt(1000, 10000),
                    userDto,
                    "test case",
                    objectMapper
            );
            MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/user/testConfigP").header(JwtConst.TOKEN_HEADER, JwtConst.TOKEN_PREFIX + token)
                    .accept(MediaType.APPLICATION_JSON)
            ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertEquals(SecurityErrorResult.LOGIN_EXPIRED.getErrorCode(), objectMapper.readTree(contentAsString).path("code").asInt());

        });

    }

    @Test
    @DisplayName("test return code 403")
    public void testReturnErrorCode403(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {

            MvcResult mvcResult = mvc
                    .perform(MockMvcRequestBuilders.get("/api/user/testAnoP")
                            .with(user(SupperUser.USER_EMAIL)
                                    .password("pass")
                                    .roles("SUPPEYR_ROLE", "ADMIN")
                                    .authorities(new SimpleGrantedAuthority("sec_crgbhjnkkeateUser"))
                            )
                    ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertNotNull(contentAsString);
            assertNotEquals(contentAsString, "testAnoP ok");
            assertNotEquals(contentAsString.length(), 0);
            assertEquals(SecurityErrorResult.ACCESS_DENIED.getErrorCode(),
                    objectMapper.readTree(contentAsString).path("code").asInt());

        });

    }

    @Test
    @DisplayName("test return code 405")
    public void testReturnErrorCode405(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {

            MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/user/testConfigP")
                    .accept(MediaType.APPLICATION_JSON)
            ).andExpect(status().isOk()).andReturn();

            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertNotNull(contentAsString);
            assertNotEquals(contentAsString, "testAnoP ok");
            assertNotEquals(contentAsString.length(), 0);
            assertEquals(SecurityErrorResult.NO_TOKEN_PROVIDED.getErrorCode(),
                    objectMapper.readTree(contentAsString).path("code").asInt());

        });

    }

    @Test
    @DisplayName("test return code 406")
    public void testReturnErrorCode406(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {

            MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders
                            .get("/api/user/testConfigP")
                            .header(JwtConst.TOKEN_HEADER, JwtConst.TOKEN_PREFIX + "asdnhaj")
                            .accept(MediaType.APPLICATION_JSON))
                    .andReturn();

            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertNotNull(contentAsString);
            assertNotEquals(contentAsString, "testAnoP ok");
            assertNotEquals(contentAsString.length(), 0);
            assertEquals(SecurityErrorResult.TOKEN_INVALID.getErrorCode(), objectMapper.readTree(contentAsString).path("code").asInt());

        });

    }


}
