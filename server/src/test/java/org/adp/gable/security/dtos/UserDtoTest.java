package org.adp.gable.security.dtos;

import org.adp.gable.security.entity.UserEntity;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserDtoTest {

    @Test
    @DisplayName("test user Dto equals hashcode")
    public void testHashCode(){
        UserDto userDto = new UserDto();
        userDto.setId(0L);
        UserDto userDto1 = new UserDto();
        userDto.setId(1L);
        final int hashCode = userDto.hashCode();
        final int hashCode1 = userDto1.hashCode();
        assertNotEquals(hashCode, hashCode1);
        assertNotEquals(userDto.toString(), userDto1.toString());
        assertNotEquals(userDto, userDto1);
        assertNotNull(userDto.toString());
    }



    @Test
    @DisplayName("test initBeforeUpdate")
    public void testIinitBeforeSave(){
        UserEntity userEntity = new UserEntity();
        userEntity.setModifiedBy(100L);
        userEntity.setCreatedBy(100L);
        userEntity.setTenantId(100L);
        userEntity.initBeforeSave();
        assertEquals(userEntity.getCreatedBy(), 0L);
        assertEquals(userEntity.getModifiedBy(), 0L);
        assertEquals(userEntity.getTenantId(), 0L);
        assertNull(userEntity.getOperationUrl());
        assertNotNull(userEntity.getDateCreated());
        assertNotNull(userEntity.getDateModified());



        userEntity = new UserEntity();
        userEntity.setModifiedBy(100L);
        userEntity.setCreatedBy(100L);
        userEntity.setTenantId(100L);
        userEntity.setDateCreated(null);

        userEntity.initBeforeUpdate();
        assertEquals(userEntity.getCreatedBy(), 100L);
        assertEquals(userEntity.getModifiedBy(), 0L);
        assertEquals(userEntity.getTenantId(), 100L);
        assertNull(userEntity.getOperationUrl());
        assertNull(userEntity.getDateCreated());
        assertNotNull(userEntity.getDateModified());
    }



    @Test
    @DisplayName("test InitBeforeUpdate")
    public void testInitBeforeUpdate(){
        UserEntity userEntity = new UserEntity();
        userEntity.setModifiedBy(100L);
        userEntity.setCreatedBy(100L);
        userEntity.setTenantId(100L);
        userEntity.setDateCreated(null);

        userEntity.initBeforeUpdate();
        assertEquals(userEntity.getCreatedBy(), 100L);
        assertEquals(userEntity.getModifiedBy(), 0L);
        assertEquals(userEntity.getTenantId(), 100L);
        assertNull(userEntity.getOperationUrl());
        assertNull(userEntity.getDateCreated());
        assertNotNull(userEntity.getDateModified());
    }

}