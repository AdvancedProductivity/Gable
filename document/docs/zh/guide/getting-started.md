# 起步

在程序启动之前，需要先准备一下环境。

`Gable` 对所运行的机器没有太多要求，只需要安装一个 JDK8 的环境即可。

如果您下载 JDK 有困难，可以在这里找到CDN版本: [https://www.injdk.cn/](https://www.injdk.cn/)


## 数据库

`Gable` 默认是基于当下比较火爆的 `Postgresql` 开发，所以在运行程序之前，需要先准备一下数据库相关的环境。

执行以下 `sql`:
```sql
-- 创建数据库 名为 app
create database gable with owner postgres;

-- 创建连接数据库的账号密码(和代码中的配置对应)
create user app with password '12345678';

-- 分配访问权限
grant connect, create, temporary on database gable to app;

```
至于其它的数据库表以及索引等，会在程序启动时自动创建。