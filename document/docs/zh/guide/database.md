# 数据库表设计

`Gable` 中的大多数数据表，都会有些基础字段记录表的数据的变更。相关字段如下

|  字段名   | 类型  | 默认值 | 注释 |
|  ----  | ----  | ----  | ----  |
| tenant_id  | `long` | `0` | 租户Id,为多租户做准备，有可能用不到 |
| created_by  | `long` | `null` | 记录谁创建了数据 |
| date_created  | `timestamp` | `null` | 数据的创建时间，只会在数据创建的时候被赋值 |
| modified_by  | `long` | `null` | 记录谁修改了数据 |
| date_modified  | `timestamp` | `null` | 数据的更新时间，会在数据更新时更新 |
| date_modified  | `timestamp` | `null` | 数据的更新时间，会在数据更新时更新 |
| operationUrl  | `varchar(64)` | `null` | 记录创建这条数据或者修改这条数据的 `Http` 请求的 `url` |
| data_from  | `varchar(32)` | `null` | 记录数据来源,值来自业务层的约定 |

## sec_user

**用户表**，该表包含了基础字段

|  字段名   | 类型  | 默认值 | 注释 |
|  ----  | ----  | ----  | ----  |
| id  | `long` | `0` | 主键id,使用 sequence名：`user_sequence` |
| username  | `varchar(25)` | `null` | 用户名 |
| password  | `varchar(64)` | `null` | 密码，加密后的字符串 |
| email  | `varchar(38)` | `not null` | 邮箱，用来登录 |
| avatar  | `varchar(38)` | `null` | 头像地址 |
| account_non_expired  | `bool` | `true` | 账户是否过期（满足SpringSecurity配置） |
| account_non_locked  | `bool` | `true` | 账户是否被锁定（满足SpringSecurity配置） |
| credentials_non_expired  | `bool` | `true` | 密码是否过期（满足SpringSecurity配置） |
| enabled  | `bool` | `true` | 是否可用（满足SpringSecurity配置） |

该表 `email` 字段是唯一索引。

## sec_role

**角色表**，该表包含了基础字段

|  字段名   | 类型  | 默认值 | 注释 |
|  ----  | ----  | ----  | ----  |
| id  | `long` | `0` | 主键id,使用 sequence名：`role_sequence` |
| name  | `varchar(16)` | `not null unique` | 角色名 |
| admin_user  | `bool` | `false` | 角色类型，`true`为超级管理员，`false`为普通角色 |

## sec_role_permission_relation

**角色权限关系表**，该表为关系表，不包含基础字段

|  字段名   | 类型  | 默认值 | 注释 |
|  ----  | ----  | ----  | ----  |
| id  | `long` | `0` | 主键id,使用 sequence名：`role_perm_relation_sequence` |
| role_id  | `long` | `0` | 角色id |
| permission_code  | `varchar(16)` | `null` | 权限代码 |

该表 `role_id` 和 `permission_code` 存在一个唯一的索引。

`permission_code` 的定义在枚举类中，代码位置: `org.adp.gable.security.PermissionType`

## sec_role_user_relation

**用户角色关系表**，该表为关系表，不包含基础字段

|  字段名   | 类型  | 默认值 | 注释 |
|  ----  | ----  | ----  | ----  |
| id  | `long` | `0` | 主键id,使用 sequence名：`role_user_relation_sequence` |
| role_id  | `long` | `0` | 角色id |
| user_id  | `long` | `0` | 用户id |

该表 `role_id` 和 `user_id` 存在一个唯一的索引。