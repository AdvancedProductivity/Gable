package org.adp.gable.security.entity;

import lombok.Data;
import org.adp.gable.common.entity.BaseEntity;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

/**
 * @author zzq
 */
@Entity(name = "sec_user")
@org.hibernate.annotations.Table(appliesTo = "sec_user", comment = "user table, 用户表")
@javax.persistence.Table(name = "sec_user", indexes = {
        @Index(name = "idx_user_dateCreated", columnList = "date_created", unique = false),
        @Index(name = "idx_user_email", columnList = "email", unique = true)
})
@Data
public class UserEntity extends BaseEntity {

    @Id
    @SequenceGenerator(
            name = "user_sequence"
            , sequenceName = "user_sequence"
            , allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;

    @Column(
            name = "username",
            unique = false,
            columnDefinition = "varchar(25) default null",
            nullable = true
    )
    private String username;

    @Column(
            name = "password",
            unique = false,
            columnDefinition = "varchar(64) default null",
            nullable = true
    )
    private String password;

    @Column(
            name = "email",
            columnDefinition = "varchar(38)",
            nullable = false
    )
    @Comment("email used for login")
    private String email;

    @Column(
            name = "avatar",
            unique = false,
            columnDefinition = "varchar(38) default null",
            nullable = true
    )
    @Comment("avatar url path 头像地址")
    private String avatar;


    @Comment("from spring security.is expired. 账户是否过期")
    @Column(
            name = "account_non_expired",
            unique = false,
            columnDefinition = "bool default true",
            nullable = true
    )
    private Boolean accountNonExpired;

    @Comment("from spring security.is locked. 账户是否被锁定")
    @Column(
            name = "account_non_locked",
            unique = false,
            columnDefinition = "bool default true",
            nullable = true
    )
    private Boolean accountNonLocked;

    @Comment("from spring security.is credentials(password) expired. 密码是否过期")
    @Column(
            name = "credentials_non_expired",
            unique = false,
            columnDefinition = "bool default true",
            nullable = true
    )
    private Boolean credentialsNonExpired;

    @Comment("from spring security.is enabled. 是否可用")
    @Column(
            name = "enabled",
            unique = false,
            columnDefinition = "bool default true",
            nullable = true
    )
    private Boolean enabled;

    public UserEntity() {
    }

    public UserEntity(String email) {
        this.email = email;
        // defaultSetStatus();
    }

    @Override
    public void initBeforeSave() {
        super.initBeforeSave();
        defaultSetStatus();
    }

    @Override
    public void initBeforeUpdate() {
        super.initBeforeUpdate();
        defaultSetStatus();
    }

    private void defaultSetStatus() {
        if (this.accountNonExpired == null) {
            this.accountNonExpired = Boolean.TRUE;
        }
        if (this.credentialsNonExpired == null) {
            this.credentialsNonExpired = Boolean.TRUE;
        }
        if (this.accountNonLocked == null) {
            this.accountNonLocked = Boolean.TRUE;
        }
        if (this.enabled == null) {
            this.enabled = Boolean.TRUE;
        }
    }
}
