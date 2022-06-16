# 记忆助手

主要是帮助开发人员速查一些东西，对非开发人员不重要。

## PostgreSql 相关

#### 启动
```shell
pg_ctl start -D ../data -l logfile
```
#### 登录数据库
```shell
# psql -U [用户名]

psql -U postgress
```
#### 查看数据库
```shell
\l
```
#### 选择数据库
```shell
\c [数据库名]

\c gable
```
