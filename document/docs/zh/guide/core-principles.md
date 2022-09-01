# 核心原理

## 基本理论

如果梳理下我们的日常生活中的做事的步骤，我们做一件事，比如登录一个网页。

那我肯定要先有一个账号和密码，准备好登录和密码之后呢，再去点击登录按钮。

最后我们得出一个登录成功的提示，然后跳转到其它的界面。

我们可以把这个动作抽象一下，抽象成一个类似下面的图：

![抽象图](https://i.bmp.ovh/imgs/2022/09/01/3c7123f4d68aa6bf.png)

在上面例子中：
- 输入：登录所需的账号密码
- 做事：就是去做登录的一系列动作
- 输出：就是获得登录成功或者登录失败的信息

一切逻辑都是那么的合理，但是还缺少非常重要的一点，那就是如何描述 `输入` 和 `输出`。

选来选去，`Json` 都是一个好的选择，因为`Json` 的本质是一棵树，表达能力足够丰富。

比如，上面的案例中。输入就可以这样描述登录所需的账号密码：
```json
{
  "account": "gable@open.com",
  "pwd": "gableIsGood"
}
```

输出的数据可以被设计成这样
```json
{
  "result": true,
  "token": "asdasdxasda"
}
```

还有一个重要的问题，中间的做事的环节，要如何实现呢。

本质上来说，输入的设计是灵活的，做事的环节和输入的字段是要约定好的。

比如我们输入定义是的 `account` 字段，那么做事的环节中也需要去拿这个字段。

（在上面的案例中，做事的节点可以用 `WebDriver` 自由实现）

这样灵活的设计，在设计上是非常灵活的。

比如说，一个 `Http请求的` 定义，可以被抽象为下面的图:

![Http的抽象图](https://i.bmp.ovh/imgs/2022/09/01/85ebabe834c88407.png)

假设一个 `Get` 请求，我们可以这样描述输入( 以 `get` 方式访问 `http://www.gable.org` ):

```json
{
  "method": "GET",
  "protocol": "https",
  "host": ["www", "gable", "org"]
}
```

然后做事的 Http 再拿到上面的做事的请求之后，先拼接请求地址参数，然后发起请求。

最后返回结果。

目前来看，这是一个比较棒的设计，而且扩展性非常强，举一个例子：

在协作的场景中，我们可能有多套环境，比如有时候，我要访问的是 `http://qa.gable.org` ,这样的地址。

我们只需要定义一套规则，来修改 输入 `json` 中的字段值即可，前面讲过 `json` 的本质是一颗树，只需要改变这棵树中的某一个节点即可。

## 扩展性

输入的 `json` 和做事的执行器之间有约定，这样就有非常强的扩展性。

比如我们约定好，做事的执行器 发出一个 ``udp`` 的请求，那么输入大体可以这样设计：


```json
{
  "host": "192.0.0.5",
  "port": "2208",
  "binaryArray": [1,2,3,4,5]
}
```

做事的执行器再拿到这个json之后，只需要把 `binaryArray` 这个数组发到 `192.0.0.5` 即可。

我们几乎可以做任何东西，比如复现我百度查询东西，我可以这样定义输入：
```json
{
    "keyword": "Hello World"
}
```
做事的执行器可以调用 `WebDriver` 的接口，代码大体这样写：
```groovy

import com.fasterxml.jackson.databind.node.ArrayNode
import com.fasterxml.jackson.databind.node.ObjectNode
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.*;

url = 'https://www.baidu.com'
key = in.path('keyword').asText()
searchId = in.path('searchInputId').asText('kw')
// 这里的环境应该根据本机配置修改
System.setProperty("webdriver.chrome.driver", 
                   "C:\\Program Files\\Git\\bin\\chromedriver.exe");
WebDriver driver = new ChromeDriver();
driver.get(url);
driver.manage().window().maximize();
searchInput = driver.findElementById(searchId)
searchInput.sendKeys(key)
searchInput.sendKeys(Keys.ENTER)
Thread.sleep(3000);
List<WebElement> t = driver.findElements(By.className("t"));
ArrayNode arrayNode = out.arrayNode();
for (WebElement webElement : t) {
    arrayNode.add(webElement.getText())
}
out.set("find", arrayNode)
out.put("count", arrayNode.size())
driver.quit()
```

上面的代码就会把百度查出来的标题返回。

## 总结

我们可以用同样的设计，实现各种 接口协议的 API 测试请求（grpc,dubbo,tcp,udp,WebDriver）。

而我们的`API协作`的场景，其本质就是管理各种`输入json`的权限，变更。

当前`Gable`只实现了 `Http` 接口的执行器，后续会有更多实现。

附`Gable`实现 `Http`的源代码：[Github 链接](https://github.com/AdvancedProductivity/Gable/blob/main/server/src/main/java/org/adp/gable/runner/impl/HttpAction.java)

可以看到十分简单即可实现。我们还有很多要做的事情要做。