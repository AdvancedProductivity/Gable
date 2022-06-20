package org.adp.gable.entity;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.adp.gable.SupperUser;
import org.adp.gable.security.TestTokenUtils;
import org.adp.gable.security.dao.UserRepository;
import org.adp.gable.security.dtos.UserDto;
import org.adp.gable.security.entity.UserEntity;
import org.adp.gable.security.service.JwtUserServiceImpl;
import org.adp.gable.security.utils.JwtConst;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

@SpringBootTest
@WebAppConfiguration
public class InitEntityControllerTest {


    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Resource
    private ObjectMapper objectMapper;

    @Resource
    private JwtUserServiceImpl jwtUserService;

    @Resource
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }


    @Test
    @DisplayName("test entity init created info")
    public void testEntityInitBeforeCreated() {
        String initCreateData = "/all/user_initCreated";
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {
            final UserDto user = (UserDto) jwtUserService.loadUserByUsername(SupperUser.USER_EMAIL);
            assertNotNull(user);

            final String token = TestTokenUtils.getToken(SupperUser.USER_EMAIL, SupperUser.PASSWORD, mvc);
            assertNotNull(token);
            assertTrue(StringUtils.isNotBlank(token));

            MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders
                            .get(initCreateData)
                            .header(JwtConst.TOKEN_HEADER, JwtConst.TOKEN_PREFIX + token)
                            .accept(MediaType.APPLICATION_JSON))
                    .andReturn();

            String contentAsString = mvcResult.getResponse().getContentAsString();

            assertNotNull(contentAsString);
            assertNotEquals(contentAsString.length(), 0);

            final JsonNode returnJson = objectMapper.readTree(contentAsString);
            assertTrue(returnJson.isObject());

            assertEquals(initCreateData, returnJson.path("data").path("operationUrl").asText());
            assertEquals(user.getTenantId(), returnJson.path("data").path("tenantId").asInt());

        });


    }

    @Test
    @DisplayName("test entity init update info")
    public void testEntityInitBeforeUpdate() {
        String initUpdateData = "/all/user_initUpdated";
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {
            final UserDto user = (UserDto) jwtUserService.loadUserByUsername(SupperUser.USER_EMAIL);
            assertNotNull(user);

            final String token = TestTokenUtils.getToken(SupperUser.USER_EMAIL, SupperUser.PASSWORD, mvc);
            assertNotNull(token);
            assertTrue(StringUtils.isNotBlank(token));

            MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders
                            .get(initUpdateData)
                            .header(JwtConst.TOKEN_HEADER, JwtConst.TOKEN_PREFIX + token)
                            .accept(MediaType.APPLICATION_JSON))
                    .andReturn();

            String contentAsString = mvcResult.getResponse().getContentAsString();

            assertNotNull(contentAsString);
            assertNotEquals(contentAsString.length(), 0);

            final JsonNode returnJson = objectMapper.readTree(contentAsString);
            assertTrue(returnJson.isObject());

            assertEquals(initUpdateData, returnJson.path("data").path("operationUrl").asText());
            assertEquals(user.getId(), returnJson.path("data").path("modifiedBy").asInt());

        });

    }

    @Test
    @DisplayName("test entity in database operation")
    public void testEntityInitDatabaseOperation() {

        String defineUriOfCreate = "testEntityInitDatabaseOperationOfCreate";
        String defineUriOfUpdate = "testEntityInitDatabaseOperationOfUpdate";
        String email = RandomStringUtils.random(5, true, true) + "@abc.com";

        final UserDto loginUser = (UserDto) jwtUserService.loadUserByUsername(SupperUser.USER_EMAIL);

        assertNotNull(loginUser);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginUser,
                null, loginUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setRequestURI(defineUriOfCreate);
        ServletRequestAttributes attrs = new ServletRequestAttributes(request);
        RequestContextHolder.setRequestAttributes(attrs);
        try {
            UserEntity userEntity = new UserEntity();
            userEntity.setEmail(email);
            String oldPwd = RandomStringUtils.random(10, true, true);
            userEntity.setPassword(oldPwd);

            final UserEntity saved = userRepository.save(userEntity);

            Date oldDate = saved.getDateModified();
            assertNotNull(saved.getId());
            assertNotNull(saved.getDateCreated());
            assertEquals(loginUser.getCreatedBy(), loginUser.getId());
            assertEquals(defineUriOfCreate, saved.getOperationUrl());

            request.setRequestURI(defineUriOfUpdate);
            attrs = new ServletRequestAttributes(request);
            RequestContextHolder.resetRequestAttributes();
            RequestContextHolder.setRequestAttributes(attrs);

            String newPwd = RandomStringUtils.random(10, true, true);
            saved.setPassword(newPwd);
            final UserEntity afterSaved = userRepository.save(saved);

            Thread.sleep(300);
            assertEquals(defineUriOfUpdate, afterSaved.getOperationUrl());
            assertNotEquals(oldDate.getTime(), afterSaved.getDateModified().getTime());
            assertNotEquals(oldPwd, afterSaved.getPassword());

        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            RequestContextHolder.resetRequestAttributes();
            SecurityContextHolder.clearContext();
        }


    }

}
