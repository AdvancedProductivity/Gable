
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
insert into sec_role_user_relation (id, role_id, user_id) VALUES ((select nextval ('role_user_relation_sequence')), 0,0)