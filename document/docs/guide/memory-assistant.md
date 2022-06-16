# Memory Assistant

This page is mainly used to help developers quickly check some things, which is not important to non developers.

## About PostgreSql 

#### Start
```shell
pg_ctl start -D ../data -l logfile
```
#### login database
```shell
# psql -U [user name]

psql -U postgress
```
#### show all database
```shell
\l
```
#### select database
```shell
\c [database name]

\c gable
```
