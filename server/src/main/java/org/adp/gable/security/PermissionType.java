package org.adp.gable.security;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * the permission's define
 *
 * @author zzq
 */

@Getter
@AllArgsConstructor
public enum PermissionType {

    /**
     * permission of create user
     */
    SEC_CREATE_USER("sec_createUser", "SEC_CREATE_USER"),

    /**
     * permission of create role
     * */
    SEC_CREATE_ROLE("sec_createRole", "SEC_CREATE_USER"),

    /**
     * permission of modify role’s permission
     * */
    SEC_MODIFY_ROLE("sec_modifyRole", "SEC_CREATE_USER"),

    /**
     * permission of delete the role
     * */
    SEC_DELETE_ROLE("sec_deleteRole", "SEC_DELETE_ROLE"),


    /**
     * permission of modify user‘s password
     */
    SEC_MODIFY_PWD("sec_modifyPwd", "SEC_CREATE_USER"),

    ;

    private String code;
    private String i18nKey;
}
