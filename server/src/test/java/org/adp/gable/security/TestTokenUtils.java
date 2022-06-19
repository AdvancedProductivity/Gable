package org.adp.gable.security;

import org.adp.gable.SupperUser;
import org.adp.gable.security.utils.JwtConst;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TestTokenUtils {

    public static String getToken(String email, String password, MockMvc mvc) throws Exception {
        MvcResult mvcResult = mvc
                .perform(MockMvcRequestBuilders.get(JwtConst.LOGIN_PATH)
                        .queryParam("username", SupperUser.USER_EMAIL)
                        .queryParam("password", "123456")
                ).andExpect(status().isOk()).andReturn();
        return mvcResult.getResponse().getHeader(JwtConst.TOKEN_HEADER);
    }

}
