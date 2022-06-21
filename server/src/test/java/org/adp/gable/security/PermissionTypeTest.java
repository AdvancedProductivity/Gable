package org.adp.gable.security;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PermissionTypeTest {

    @Test
    @DisplayName("test load permission enum")
    public void testLoadPermissionEnum(){
        assertDoesNotThrow(() -> {
            for (PermissionType value : PermissionType.values()) {
                assertNotNull(value);
            }
        });
    }
}