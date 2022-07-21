create table sec_role
(
    id            bigint                   not null,
    created_by    bigint      default null not null,
    data_from     varchar(32) default null,
    date_created  timestamp   default null,
    date_modified timestamp   default null,
    modified_by   bigint      default null,
    operation_url varchar(64) default null,
    tenant_id     bigint      default 0    not null,
    admin_user    bool        default false,
    name          varchar(16)              not null,
    primary key (id)
);
create table sec_role_user_relation (
                                        id bigint not null,
                                        role_id bigint default null not null,
                                        user_id bigint default null not null,
                                        primary key (id)
);

create table sec_role_permission_relation
(
    id              bigint                   not null,
    permission_code varchar(16) default null not null,
    role_id         bigint      default null not null,
    primary key (id)
);

create table sec_user
(
    id                      bigint                   not null,
    created_by              bigint      default null not null,
    data_from               varchar(32) default null,
    date_created            timestamp   default null,
    date_modified           timestamp   default null,
    modified_by             bigint      default null,
    operation_url           varchar(64) default null,
    tenant_id               bigint      default 0    not null,
    account_non_expired     bool        default true,
    account_non_locked      bool        default true,
    avatar                  varchar(38) default null,
    credentials_non_expired bool        default true,
    email                   varchar(38)              not null,
    enabled                 bool        default true,
    password                varchar(64) default null,
    username                varchar(25) default null,
    primary key (id)
);
create index idx_role_dateCreated on sec_role (date_created);

alter table sec_role
drop
constraint if exists idx_role_name;

alter table sec_role_permission_relation
drop constraint if exists idx_srpr_name;

alter table sec_role_permission_relation
    add constraint idx_srpr_name unique (role_id, permission_code);

alter table sec_role_user_relation
drop constraint if exists idx_srur_name;

alter table sec_role_user_relation
    add constraint idx_srur_name unique (role_id, user_id);

create index idx_user_dateCreated on sec_user (date_created);

alter table sec_user
drop constraint if exists idx_user_email;

alter table sec_user
    add constraint idx_user_email unique (email);

create sequence role_perm_relation_sequence start with 1 increment by 1;

create sequence role_sequence start with 1 increment by 1;

create sequence role_user_relation_sequence start with 1 increment by 1;

create sequence user_sequence start with 1 increment by 1;


INSERT into sec_user (id, created_by, data_from, date_created, date_modified, modified_by, operation_url, tenant_id,
                      avatar, email, password, username)
values (0, 0, 'app', current_timestamp, current_timestamp, 0, 'app_start', 0, '', 'default@app.com', '$2a$10$EFSN19/4dEt3SWTvpQBTkus.a1wIzngWiHgUDArtQI2QZIY7yBNee', 'Fast Login');

INSERT into sec_role (id, created_by, data_from, date_created, date_modified, modified_by, operation_url, tenant_id, name, admin_user) VALUES (0, 0, 'app',current_timestamp, current_timestamp,0,'',0, 'SUPPER_ROLE', true)
   ;


insert into sec_role_permission_relation (id, permission_code, role_id) VALUES
((select nextval ('role_perm_relation_sequence')), 'sec_createUser', 0)
                                                                             ,((select nextval ('role_perm_relation_sequence')), 'sec_createRole', 0)
                                                                             ,((select nextval ('role_perm_relation_sequence')), 'sec_modifyRole', 0)
                                                                             ,((select nextval ('role_perm_relation_sequence')), 'sec_deleteRole', 0)
                                                                             ,((select nextval ('role_perm_relation_sequence')), 'sec_modifyPwd', 0)
;
insert into sec_role_user_relation (id, role_id, user_id) VALUES ((select nextval ('role_user_relation_sequence')), 0,0);



