package org.adp.gable.security.controller;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
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
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@ContextConfiguration
@WebAppConfiguration
public class PermissionAndCorsControllerTest {

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
    @DisplayName("test access resource without permission")
    public void testAccessResourceWithoutPermission(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {

            MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders
                            .get("/all/randomStr")
                            .accept(MediaType.APPLICATION_JSON))
                    .andReturn();

            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertNotNull(contentAsString);
            assertNotEquals(contentAsString.length(), 0);
            final JsonNode returnJson = objectMapper.readTree(contentAsString);
            assertTrue(returnJson.isObject());
            assertTrue(returnJson.path("data").isTextual());

        });

    }


    @Test
    @DisplayName("test get method with get method")
    public void testGetWithCors(){
        assertNotNull(mvc);
        assertDoesNotThrow(() -> {

            HttpHeaders headers = new HttpHeaders();
            headers.setAccessControlRequestMethod(HttpMethod.GET);
            headers.setOrigin("http://www.vfhsgbjhkj.com/asd/xasd/xas");

            MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders
                            .options("/all/randomStr")
                            .headers(headers)
                            .accept(MediaType.APPLICATION_JSON))
                    .andDo(print())
                    .andReturn();

            String contentAsString = mvcResult.getResponse().getContentAsString();
            assertNotNull(contentAsString);
            assertEquals(contentAsString.length(), 0);


            mvcResult = mvc.perform(MockMvcRequestBuilders
                            .get("/all/randomStr")
                            .headers(headers)
                            .accept(MediaType.APPLICATION_JSON))
                    .andDo(print())
                    .andReturn();

            contentAsString = mvcResult.getResponse().getContentAsString();
            final JsonNode returnJson = objectMapper.readTree(contentAsString);
            assertTrue(returnJson.isObject());
            assertTrue(returnJson.path("data").isTextual());

        });

    }
}
