package org.adp.gable.security.service;

import org.adp.gable.SupperUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;

import javax.annotation.Resource;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JwtUserServiceImplTest {

    @Resource
    private JwtUserServiceImpl jwtUserService;

    @Test
    @DisplayName("test load the user info while login")
    public void testLoadUserByEmail() {
        final UserDetails userDetails = jwtUserService.loadUserByUsername(SupperUser.USER_EMAIL);
        assertNotNull(userDetails);
        assertNotNull(userDetails.getAuthorities());
        assertNotEquals(userDetails.getAuthorities(), 0);
        assertTrue(userDetails.isAccountNonExpired());
        assertTrue(userDetails.isAccountNonLocked());
        assertTrue(userDetails.isCredentialsNonExpired());
        assertTrue(userDetails.isEnabled());
        final UserDetails user = jwtUserService.loadUserByUsername(UUID.randomUUID().toString());
        assertNull(user);
    }
}