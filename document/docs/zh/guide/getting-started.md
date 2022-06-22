# 起步

在程序启动之前，需要先准备一下环境。

`Gable` 对所运行的机器没有太多要求，只需要安装一个 JDK8 的环境即可。

如果您下载 JDK 有困难，可以在这里找到CDN版本: [https://www.injdk.cn/](https://www.injdk.cn/)


## 数据库

`Gable` 默认是基于当下比较火爆的 `Postgresql` 开发，所以在运行程序之前，需要先准备一下数据库相关的环境。

执行以下 `sql`:
```sql
-- 创建数据库 名为 gable
create database gable with owner postgres;

-- 创建连接数据库的账号 app 密码 123456 (和代码中的配置对应)
create user app with password '12345678';

-- 分配访问权限
grant connect, create, temporary on database gable to app;

```
至于其它的数据库表以及索引等，会在程序启动时自动创建。


## 关于测试

如果你需要运行单元测试的代码，需要额外创建一个数据库 `gable_test` 来初始化单元测试的数据。

#### 初始化测试数据库

执行以下 `sql`:
```sql
-- 创建数据库 名为 gable_test
create database gable_test with owner postgres;

-- 分配访问权限
grant connect, create, temporary on database gable_test to app;

```
正式环境中,`Gable` 使用 `Flyway` 管理不同版本之间的数据库迁移，而测试环境中禁用了 `Flyway`,启用了`spring.sql.init.mode=always`

在测试目录下的 `data.sql` 和 `schema.sql` 定义了测试数据库中所需要的数据。
每次启动都会初始化数据库，如果后续因为测试的需要，只需要更改  `data.sql` 和 `schema.sql`  的数据即可。

#### 命令执行测试

普通测试
```shell
mvn test
```

覆盖率测试

```shell
mvn test jacoco:repor
```
该测试会生成代码覆盖率以及分支的检测，报告位置见: `target/site/jacoco/index.html`

其它帮助文档： 
- [https://www.baeldung.com/jacoco](https://www.baeldung.com/jacoco)
- [https://www.baeldung.com/jacoco-report-exclude](https://www.baeldung.com/jacoco-report-exclude)