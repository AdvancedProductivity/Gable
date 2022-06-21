package org.adp.gable.security.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RoleEntityTest {

    @Test
    @DisplayName("test role type default of update")
    public void testInitUpdate(){
        RoleEntity entit = new RoleEntity();
        entit.initBeforeUpdate();
        assertNotNull(entit.getDateModified());
        assertEquals(Boolean.FALSE, entit.getAdminRole());
        entit.setAdminRole(Boolean.TRUE);
        entit.initBeforeUpdate();
        assertEquals(Boolean.TRUE, entit.getAdminRole());
        assertNotNull(entit.getDateModified());

    }

    @Test
    @DisplayName("test role type default of create")
    public void testInitCreated(){
        RoleEntity entit = new RoleEntity();
        entit.setAdminRole(Boolean.TRUE);
        entit.initBeforeSave();
        assertEquals(Boolean.FALSE, entit.getAdminRole());
        assertNotNull(entit.getDateModified());

    }
}