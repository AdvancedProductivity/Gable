package org.adp.gable.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.adp.gable.common.beans.Result;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.servlet.FlashMap;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import static org.junit.jupiter.api.Assertions.*;

public class ResultUtilsTest {

    private static String PRIFIX = "gable";

    @Test
    @DisplayName("test result parser util")
    public void testReadUtil(){
        assertDoesNotThrow(() -> {
            MvcResult mvcResult = getTestResponse();
            Result<String> result = ResultUtils.readResult(mvcResult);
            assertNotNull(result);
            assertTrue(result.isResult());
            assertNotNull(result.getData());
            assertTrue(StringUtils.startsWith(result.getData(), PRIFIX));
            assertEquals(result.getData().length(), 10 + PRIFIX.length());
        });
    }

    private MvcResult getTestResponse() {
        return new MvcResult() {
            @Override
            public MockHttpServletRequest getRequest() {
                return null;
            }

            @Override
            public MockHttpServletResponse getResponse() {
                MockHttpServletResponse response = new MockHttpServletResponse();
                ObjectMapper objectMapper = new ObjectMapper();
                Result<String> success = Result.success(PRIFIX + RandomStringUtils.random(10, true, true));
                try {
                    response.getWriter().write(objectMapper.writeValueAsString(success));
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return response;
            }

            @Override
            public Object getHandler() {
                return null;
            }

            @Override
            public HandlerInterceptor[] getInterceptors() {
                return new HandlerInterceptor[0];
            }

            @Override
            public ModelAndView getModelAndView() {
                return null;
            }

            @Override
            public Exception getResolvedException() {
                return null;
            }

            @Override
            public FlashMap getFlashMap() {
                return null;
            }

            @Override
            public Object getAsyncResult() {
                return null;
            }

            @Override
            public Object getAsyncResult(long timeToWait) {
                return null;
            }
        };
    }
}