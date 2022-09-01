# 起步

在程序启动之前，需要先准备一下环境。

`Gable` 对所运行的机器没有太多要求，只需要安装一个 JDK8 的环境即可。

如果您下载 JDK 有困难，可以在这里找到CDN版本: [https://www.injdk.cn/](https://www.injdk.cn/)

## 运行代码

可以直接从 `Github` 克隆代码，控制台执行命令:
```shell

# https 链接
git clone https://github.com/AdvancedProductivity/Gable.git

# ssh 链接
git clone git@github.com:AdvancedProductivity/Gable.git

```

## 代码仓库目录结构

```md
├── assets (Github readme.md 中引用的资源)
├── document (基于VuePress的项目文档) 
├── server (基于 SpringBoot 的后台服务，提供协同服务和api执行代理服务)
├── client (前端客户端的代码,包含Electron客户端和Web端两套)
│   ├── app (Electron后端的程序代码)
│   ├── e2e (e2e测试,当前并没有充实e2e测试用例，手动保证测试)
│   ├── src (web端的代码实现，Electron也会加载这里的代码)
│   │   └──  app (前端组件都在这里实现的)
│   │   └── assets (资源文件)
│   │   └── environments (环境配置)
│   └── package.json
│ 
└── README.md
```

## 启动项目

`Gable`本身是一个普通的 Angular 项目，只需要下载依赖然后启动就好了，但是因为使用
[Angular-Electron](https://github.com/maximegris/angular-electron)
的模板，这个模板在下载依赖库时会向`Github`下载Electron相关依赖，
这个下载比较要求用户的网络环境，如果出现了下载失败的情况，多下载几次就好了。

```shell
cd client

npm i

npm run start
```
成功启动之后，它会启动浏览器并打开 [http://localhost:4200](http://localhost:4200)，同时启动`Electron`的客户端，在开发模式下，`Electron`端通过`WebView`加载的 `http://localhost:4200`

## 启动后台服务

`Gable` 是为用户提供协作服务的，处于用户体验的角度考虑，用户可以不连接`Gable`后台服务当做单机版本用。

但是当遇到协作的场景时，只需要在 设置中连接 `Gable` 的后台即可轻松开启协作。

`Gable` 的后台代码是写在 `server` 目录下的，它目前而言还仅仅是一个非常简单非常普通的 `SpringBoot` 的项目。

如果你有 `java` 的开发经验，应该非常简单就能启动该服务。

该服务会默认占用机器的 ``2208`` 端口，``2208``是指的2022年8月，是 `Gable` 项目启动的月份。

## 数据库

`Gable` 在最初的设计是使用的 `Postgresql` 来存储数据，但是很快我们就遇到了两个问题：

- 用户可能没有 `Postgresql` 实例，想使用 `Gable` 还得现安装，给人体验不好
- 如果要使用 `Github Actions` 做单元测试，还需要拉取一个带有 `Postgresql` 的镜像。

基于以上两点考虑，我们使用 `flyway`，使得 `Gable` 可以集成两套数据库：`H2` 和 `Postgresql`。

为什么选择 `H2` 数据库呢，因为它可以在程序启动时，自动创建数据库文件，不需要单独安装一个数据库进程。

这样用户就可以一个 `java -jar server.jar` 的命令，直接启动后台服务，这是基于提升用户体验的决策。

`Gable` 默认是基于当下比较火爆的 `Postgresql` 开发，所以在运行程序之前，需要先准备一下数据库相关的环境。
## 对于 `H2`

程序启动时，会在用户目录下的 `.gable` 文件夹里生成一个 `gable-server.db` 的文件，属于全部都存放在这里。

## 对于 `Postgresql`

用户可能需要先初始化一个数据库。

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

# 测试

在项目刚开始的阶段，还写过几个测试用例，甚至还做过测试覆盖率。

但是进入高强度迭代之后，测试用例实在拖慢了进度，故而没有推进，后续会不断完善测试用例。

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

关于测试，这里有其它帮助文档： 
- [https://www.baeldung.com/jacoco](https://www.baeldung.com/jacoco)
- [https://www.baeldung.com/jacoco-report-exclude](https://www.baeldung.com/jacoco-report-exclude)