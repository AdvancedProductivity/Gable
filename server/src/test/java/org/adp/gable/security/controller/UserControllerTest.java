package org.adp.gable.security.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.adp.gable.SupperUser;
import org.adp.gable.security.dtos.UserDto;
import org.adp.gable.security.service.JwtUserServiceImpl;
import org.adp.gable.security.utils.JwtConst;
import org.adp.gable.security.utils.JwtUtils;
import org.adp.gable.security.utils.SecurityErrorResult;
import org.apache.commons.lang3.RandomUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ContextConfiguration
@WebAppConfiguration
public class UserControllerTest {
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
    @DisplayName("test Annotation of has role")
    public void testHasRoleOfAnnotation(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {
            MvcResult mvcResult = mvc
                    .perform(MockMvcRequestBuilders.get("/api/user/testAnoR")
                            .with(user(SupperUser.USER_EMAIL)
                                    .password("pass")
                                    .roles("SUPPER_ROLE", "ADMIN")
                            )
                    ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertNotNull(contentAsString);
            assertEquals(contentAsString, "testAnoR ok");
        });
    }

    @Test
    @DisplayName("test Annotation of has no role")
    public void testNoHasRoleOfAnnotation(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {
            MvcResult mvcResult = mvc
                    .perform(MockMvcRequestBuilders.get("/api/user/testAnoR")
                            .with(user(SupperUser.USER_EMAIL)
                                    .password("pass")
                                    .roles("SUPPEYR_ROLE", "ADMIN")
                            )
                    ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertNotNull(contentAsString);
            assertNotEquals(contentAsString, "testAnoR ok");
            assertNotEquals(contentAsString.length(), 0);
            assertEquals(objectMapper.readTree(contentAsString).path("code").asInt(), SecurityErrorResult.ACCESS_DENIED.getErrorCode());
        });
    }


    @Test
    @DisplayName("test Annotation of has permission")
    public void testHasPermissionOfAnnotation(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {
            MvcResult mvcResult = mvc
                    .perform(MockMvcRequestBuilders.get("/api/user/testAnoP")
                            .with(user(SupperUser.USER_EMAIL)
                                    .password("pass")
                                    .roles("SUPPER_ROLE", "ADMIN")
                                    .authorities(new SimpleGrantedAuthority("sec_createUser"))
                            )
                    ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertNotNull(contentAsString);
            assertEquals(contentAsString, "testAnoP ok");

        });
    }

    @Test
    @DisplayName("test Annotation of has no permission")
    public void testHasNoPermissionOfAnnotation(){
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
            assertEquals(objectMapper.readTree(contentAsString).path("code").asInt(), SecurityErrorResult.ACCESS_DENIED.getErrorCode());
        });
    }

    @Test
    @DisplayName("test http config of permission have")
    public void testHaveConfigPermission(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {
            UserDto userDto = (UserDto) jwtUserService.loadUserByUsername(SupperUser.USER_EMAIL);

            assertNotNull(userDto);
            String token = JwtUtils.generateToken(
                    System.currentTimeMillis() + JwtConst.ONLINE_TIME,
                    userDto,
                    "test case",
                    objectMapper
            );
            MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/user/testConfigP").header(JwtConst.TOKEN_HEADER, JwtConst.TOKEN_PREFIX + token)
                    .accept(MediaType.APPLICATION_JSON)
            ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertEquals(contentAsString, "testConfigP ok");

        });
    }

    @Test
    @DisplayName("test http config of Role have")
    public void testHaveRoleOfRole(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {
            UserDto userDto = (UserDto) jwtUserService.loadUserByUsername(SupperUser.USER_EMAIL);

            assertNotNull(userDto);
            String token = JwtUtils.generateToken(
                    System.currentTimeMillis() + JwtConst.ONLINE_TIME,
                    userDto,
                    "test case",
                    objectMapper
            );
            MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/user/testConfigR").header(JwtConst.TOKEN_HEADER, JwtConst.TOKEN_PREFIX + token)
                    .accept(MediaType.APPLICATION_JSON)
            ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertEquals(contentAsString, "testConfigR ok");

            mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/user/testConfigR").header(JwtConst.TOKEN_HEADER, JwtConst.TOKEN_PREFIX + token)
                    .accept(MediaType.APPLICATION_JSON)
            ).andExpect(status().isOk()).andReturn();
            contentAsString = mvcResult.getResponse().getContentAsString();
            assertEquals(contentAsString, "testConfigR ok");
        });
    }

    @Test
    @DisplayName("test jwt expired")
    public void testJwtExpired(){
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
            assertEquals(objectMapper.readTree(contentAsString).path("code").asInt(), SecurityErrorResult.LOGIN_EXPIRED.getErrorCode());

            token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZWZhdWx0QGFwcC5jb20iLCJpc3MiOiJHYWJsZSBTZXJ2ZXItLS0vYXBpL3VzZXIvbG9naW4iLCJleHAiOjE2NTYzMjEzOTMsImlhdCI6MTY1NTU2NTM5MywidXNlciI6IntcImlkXCI6MCxcInVzZXJuYW1lXCI6XCJGYXN0IExvZ2luXCIsXCJwYXNzd29yZFwiOm51bGwsXCJlbWFpbFwiOlwiZGVmYXVsdEBhcHAuY29tXCIsXCJhdmF0YXJcIjpcIlwiLFwiYWNjb3VudE5vbkV4cGlyZWRcIjp0cnVlLFwiYWNjb3VudE5vbkxvY2tlZFwiOnRydWUsXCJjcmVkZW50aWFsc05vbkV4cGlyZWRcIjp0cnVlLFwiZW5hYmxlZFwiOnRydWUsXCJhdXRob3JpdGllc1wiOlt7XCJhdXRob3JpdHlcIjpcInNlY19jcmVhdGVSb2xlXCJ9LHtcImF1dGhvcml0eVwiOlwiUk9MRV9TVVBQRVJfUk9MRVwifSx7XCJhdXRob3JpdHlcIjpcInNlY19jcmVhdGVVc2VyXCJ9LHtcImF1dGhvcml0eVwiOlwic2VjX21vZGlmeVJvbGVcIn0se1wiYXV0aG9yaXR5XCI6XCJzZWNfZGVsZXRlUm9sZVwifSx7XCJhdXRob3JpdHlcIjpcInNlY19tb2RpZnlQd2RcIn1dfSJ9.Qchbgv87dkV9M3uUXDgN5RC6g4kDKeuViaLWbT89Q0g";
            mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/user/testConfigP").header(JwtConst.TOKEN_HEADER, JwtConst.TOKEN_PREFIX + token)
                    .accept(MediaType.APPLICATION_JSON)
            ).andExpect(status().isOk()).andReturn();
            contentAsString = mvcResult.getResponse().getContentAsString();
            System.out.println(contentAsString);
            assertEquals(objectMapper.readTree(contentAsString).path("code").asInt(), SecurityErrorResult.LOGIN_EXPIRED.getErrorCode());

        });
    }



    @Test
    @DisplayName("test jwt invalid")
    public void testJwtInvalid(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {
            MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/user/testConfigP").header(JwtConst.TOKEN_HEADER, JwtConst.TOKEN_PREFIX + "asdnhaj")
                    .accept(MediaType.APPLICATION_JSON)
            ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            System.out.println(contentAsString);
            assertEquals(objectMapper.readTree(contentAsString).path("code").asInt(), SecurityErrorResult.TOKEN_INVALID.getErrorCode());

        });
    }

    @Test
    @DisplayName("test no jwt token")
    public void testNoJwtToken(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {
            MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/user/testConfigP")
                    .accept(MediaType.APPLICATION_JSON)
            ).andExpect(status().isOk()).andReturn();
            String contentAsString = mvcResult.getResponse().getContentAsString();
            System.out.println(contentAsString);
            assertEquals(objectMapper.readTree(contentAsString).path("code").asInt(), SecurityErrorResult.NO_TOKEN_PROVIDED.getErrorCode());
        });
    }
}