CREATE TABLE sec_role
(
    id            BIGINT                NOT NULL,
    created_by    BIGINT                NOT NULL,
    data_from     VARCHAR(32) DEFAULT 'NULL::character varying',
    date_created  TIMESTAMP WITHOUT TIME ZONE,
    date_modified TIMESTAMP WITHOUT TIME ZONE,
    modified_by   BIGINT,
    operation_url VARCHAR(64) DEFAULT 'NULL::character varying',
    tenant_id     BIGINT      DEFAULT 0 NOT NULL,
    admin_user    BOOLEAN     DEFAULT FALSE,
    name          VARCHAR(16)           NOT NULL,
    CONSTRAINT sec_role_pkey PRIMARY KEY (id)
);
COMMENT ON TABLE sec_role IS 'role table, 角色表';
COMMENT ON COLUMN sec_role.created_by IS 'Record who created this data.  记录谁创建了数据';
COMMENT ON COLUMN sec_role.data_from IS 'Record the data source, and the value comes from the agreement of the business layer  记录数据来源,值来自业务层的约定';
COMMENT ON COLUMN sec_role.date_created IS 'the record created date-time,only set on date created.  数据的创建时间，只会在数据创建的时候被赋值';
COMMENT ON COLUMN sec_role.date_modified IS 'the record updated date-time,will be modified on data update.  数据的更新时间，会在数据更新时';
COMMENT ON COLUMN sec_role.modified_by IS 'Record who modified this data.  记录谁修改了数据';
COMMENT ON COLUMN sec_role.operation_url IS 'Record the URL to create or modify this data.  记录创建这条数据或者修改这条数据的url';
COMMENT ON COLUMN sec_role.tenant_id IS 'tenant id.ready for multi-tenancy.Probably not. 租户Id,为多租户做准备，有可能用不到';
COMMENT ON COLUMN sec_role.admin_user IS 'role type is admin user. 角色类型，0是超级角色，不可以更改';

CREATE TABLE sec_role_permission_relation
(
    id              BIGINT                                        NOT NULL,
    permission_code VARCHAR(16) DEFAULT 'NULL::character varying' NOT NULL,
    role_id         BIGINT                                        NOT NULL,
    CONSTRAINT sec_role_permission_relation_pkey PRIMARY KEY (id)
);
COMMENT ON TABLE sec_role_permission_relation IS 'role permission relation table, 角色权限关系表';
COMMENT ON COLUMN sec_role_permission_relation.permission_code IS 'permission code(define in enum class).  权限代码(定义在枚举类中)';
COMMENT ON COLUMN sec_role_permission_relation.role_id IS 'role’s id.  角色id';

CREATE TABLE sec_user
(
    id                      BIGINT                NOT NULL,
    created_by              BIGINT                NOT NULL,
    data_from               VARCHAR(32) DEFAULT 'NULL::character varying',
    date_created            TIMESTAMP WITHOUT TIME ZONE,
    date_modified           TIMESTAMP WITHOUT TIME ZONE,
    modified_by             BIGINT,
    operation_url           VARCHAR(64) DEFAULT 'NULL::character varying',
    tenant_id               BIGINT      DEFAULT 0 NOT NULL,
    account_non_expired     BOOLEAN     DEFAULT TRUE,
    account_non_locked      BOOLEAN     DEFAULT TRUE,
    avatar                  VARCHAR(38) DEFAULT 'NULL::character varying',
    credentials_non_expired BOOLEAN     DEFAULT TRUE,
    email                   VARCHAR(38)           NOT NULL,
    enabled                 BOOLEAN     DEFAULT TRUE,
    password                VARCHAR(64) DEFAULT 'NULL::character varying',
    username                VARCHAR(25) DEFAULT 'NULL::character varying',
    CONSTRAINT sec_user_pkey PRIMARY KEY (id)
);
COMMENT ON TABLE sec_user IS 'user table, 用户表';
COMMENT ON COLUMN sec_user.created_by IS 'Record who created this data.  记录谁创建了数据';
COMMENT ON COLUMN sec_user.data_from IS 'Record the data source, and the value comes from the agreement of the business layer  记录数据来源,值来自业务层的约定';
COMMENT ON COLUMN sec_user.date_created IS 'the record created date-time,only set on date created.  数据的创建时间，只会在数据创建的时候被赋值';
COMMENT ON COLUMN sec_user.date_modified IS 'the record updated date-time,will be modified on data update.  数据的更新时间，会在数据更新时';
COMMENT ON COLUMN sec_user.modified_by IS 'Record who modified this data.  记录谁修改了数据';
COMMENT ON COLUMN sec_user.operation_url IS 'Record the URL to create or modify this data.  记录创建这条数据或者修改这条数据的url';
COMMENT ON COLUMN sec_user.tenant_id IS 'tenant id.ready for multi-tenancy.Probably not. 租户Id,为多租户做准备，有可能用不到';
COMMENT ON COLUMN sec_user.account_non_expired IS 'from spring security.is expired. 账户是否过期';
COMMENT ON COLUMN sec_user.account_non_locked IS 'from spring security.is locked. 账户是否被锁定';
COMMENT ON COLUMN sec_user.avatar IS 'avatar url path 头像地址';
COMMENT ON COLUMN sec_user.credentials_non_expired IS 'from spring security.is credentials(password) expired. 密码是否过期';
COMMENT ON COLUMN sec_user.email IS 'email used for login';
COMMENT ON COLUMN sec_user.enabled IS 'from spring security.is enabled. 是否可用';

CREATE TABLE sec_role_user_relation
(
    id      BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT sec_role_user_relation_pkey PRIMARY KEY (id)
);
COMMENT ON TABLE sec_role_user_relation IS 'role user relation table, 用户角色关系表';
COMMENT ON COLUMN sec_role_user_relation.role_id IS 'role’s id.  角色id';
COMMENT ON COLUMN sec_role_user_relation.user_id IS 'user’s id.  用户id';

CREATE INDEX idx_role_datecreated ON sec_role (date_created);

ALTER TABLE sec_role
    ADD CONSTRAINT idx_role_name UNIQUE (name);

ALTER TABLE sec_role_permission_relation
    ADD CONSTRAINT idx_srpr_name UNIQUE (role_id, permission_code);

CREATE INDEX idx_user_datecreated ON sec_user (date_created);

ALTER TABLE sec_user
    ADD CONSTRAINT idx_user_email UNIQUE (email);

ALTER TABLE sec_role_user_relation
    ADD CONSTRAINT idx_srur_name UNIQUE (role_id, user_id);

CREATE SEQUENCE IF NOT EXISTS role_perm_relation_sequence AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE SEQUENCE IF NOT EXISTS role_sequence AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE SEQUENCE IF NOT EXISTS role_user_relation_sequence AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE SEQUENCE IF NOT EXISTS user_sequence AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

INSERT into sec_user (id, created_by, data_from, date_created, date_modified, modified_by, operation_url, tenant_id,
                      avatar, email, password, username)
values (0, 0, 'app', current_timestamp, current_timestamp, 0, 'app_start', 0, '', 'default@app.com', '$2a$10$EFSN19/4dEt3SWTvpQBTkus.a1wIzngWiHgUDArtQI2QZIY7yBNee', 'Fast Login')
    ON CONFLICT (id) DO NOTHING;

INSERT into sec_role (id, created_by, data_from, date_created, date_modified, modified_by, operation_url, tenant_id, name, admin_user) VALUES (0, 0, 'app',current_timestamp, current_timestamp,0,'',0, 'SUPPER_ROLE', true)
ON CONFLICT (id) DO NOTHING;


insert into sec_role_permission_relation (id, permission_code, role_id) VALUES
((select nextval ('role_perm_relation_sequence')), 'sec_createUser', 0)
                                                                             ,((select nextval ('role_perm_relation_sequence')), 'sec_createRole', 0)
                                                                             ,((select nextval ('role_perm_relation_sequence')), 'sec_modifyRole', 0)
                                                                             ,((select nextval ('role_perm_relation_sequence')), 'sec_deleteRole', 0)
                                                                             ,((select nextval ('role_perm_relation_sequence')), 'sec_modifyPwd', 0)
;
insert into sec_role_user_relation (id, role_id, user_id) VALUES ((select nextval ('role_user_relation_sequence')), 0,0);