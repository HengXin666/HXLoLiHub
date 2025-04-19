# 测试使用的

## 一、测试目录
### 1.1 测试子目录
#### 1.1.1 测试子子目录

![##w700##](./png.drawio.svg)

## 二、测试目录
### 2.1 测试子目录
#### 2.1.1 测试子子目录
### 2.2 测试子目录
#### 2.2.1 测试子子目录
#### 2.2.2 测试子子目录

[自连接](./index.md)

```javascript [分组1-JavaScript] vscode
console.log('你好力扣')
```

```python [分组1-Python]
print('你好力扣')
```

```ruby [分组1-Ruby]
puts '你好力扣'
```

```cpp [分组1-cpp]
class ServerAddInterceptorTestController {
public:
    struct Log {
        decltype(std::chrono::steady_clock::now()) t;

        bool before(HX::web::protocol::http::Request& req, HX::web::protocol::http::Response& res) {
            HX::print::println("请求了: ", req.getPureRequesPath());
            static_cast<void>(res);
            t = std::chrono::steady_clock::now();
            return true;
        }

        bool after(HX::web::protocol::http::Request& req, HX::web::protocol::http::Response& res) {
            auto t1 = std::chrono::steady_clock::now();
            auto dt = t1 - t;
            int64_t us = std::chrono::duration_cast<std::chrono::milliseconds>(dt).count();
            HX::print::println("已响应: ", req.getPureRequesPath(), "花费: ", us, " us");
            static_cast<void>(res);
            return true;
        }
    };

    ROUTER
        .on<GET, POST>("/", [](
            Request& req,
            Response& res
        ) -> Task<> {
            auto map = req.getParseQueryParameters();
            if (map.find("loli") == map.end()) {
                res.setResponseLine(Status::CODE_200)
                .setContentType(HX::web::protocol::http::ResContentType::html)
                .setBodyData("<h1>You is no good!</h1>");
                co_return;
            }
            res.setResponseLine(Status::CODE_200)
            .setContentType(HX::web::protocol::http::ResContentType::html)
            .setBodyData("<h1>yo si yo si!</h1>");
        }, Log{})
        .on<GET, POST>("/home/{id}/**", [](
            Request& req,
            Response& res
        ) -> Task<> {
            static_cast<void>(req);
            res.setResponseLine(Status::CODE_200)
            .setContentType(HX::web::protocol::http::ResContentType::html)
            .setBodyData("<h1>This is Home</h1>");
            co_return;
        })
    ROUTER_END;
};
```

```cpp [g1-cpp]
int mian() {

}
```

```cpp [g1-c++]
[]{}();
```

```Mermaid [g2-Mermaid图表1]
timeline
    title HXLoliHub 版本发布时间线 (乱写的)
    2023-06-10 : 写下了第一行代码
    2023-08-10 : 发布了 1.0 版本
    2023-08-15 : 发布了 1.1 版本
               : 支持了 katex 和 mermaid
    2023-09-01 : 发布了 1.2 版本
               : 一个完整的笔记软件基本成型
```

```Mermaid [g2-Mermaid图表2]
timeline
    title HXLoliHub 版本发布时间线 (乱写的)
    2023-06-10 : 写下了第一行代码
    2023-08-10 : 发布了 1.0 版本
    2023-08-15 : 发布了 1.1 版本
               : 支持了 katex 和 mermaid
    2023-09-01 : 发布了 1.2 版本
               : 一个完整的笔记软件基本成型
```

```Mermaid [g2-Mermaid图表3]
timeline
    title HXLoliHub 版本发布时间线 (乱写的)
    2023-06-10 : 写下了第一行代码
    2023-08-10 : 发布了 1.0 版本
    2023-08-15 : 发布了 1.1 版本
               : 支持了 katex 和 mermaid
    2023-09-01 : 发布了 1.2 版本
               : 一个完整的笔记软件基本成型
```

```C vscode
int main() {
    // 这个是交互式的!
}
```

```cpp VsCode
#include <HXWeb/HXApi.hpp> // 宏所在头文件
#include <HXWeb/server/Server.h>

int main() {
    chdir("../static");
    setlocale(LC_ALL, "zh_CN.UTF-8");
    ROUTER_BIND(WSChatController);
    // 设置路由失败时候的端点
    ROUTER_ERROR_ENDPOINT([] ENDPOINT {
        static_cast<void>(req);
        res.setResponseLine(HX::web::protocol::http::Status::CODE_404)
           .setContentType(HX::web::protocol::http::ResContentType::html)
           .setBodyData("<!DOCTYPE html><html><head><meta charset=UTF-8><title>404 Not Found</title><style>body{font-family:Arial,sans-serif;text-align:center;padding:50px;background-color:#f4f4f4}h1{font-size:100px;margin:0;color:#990099}p{font-size:24px;color:gold}</style><body><h1>404</h1><p>Not Found</p><hr/><p>HXLibs</p>");
        co_return;
    });

    // 启动Http服务 [阻塞于此]
    HX::web::server::Server::startHttp("127.0.0.1", "28205", 16 /*可选 线程数(互不相关)*/, 10s /*可选 超时时间*/);

    // 或者, 启动Https服务 [阻塞于此], 需要提供证书和密钥
    HX::web::server::Server::startHttps("127.0.0.1", "28205", "certs/cert.pem", "certs/key.pem");
    return 0;
}
```

```css VsCode
.languageName {
  font-size: 0.9rem;
  color: rgb(153, 153, 136);
  line-height: 34px;
  font-family: var(--ifm-font-family-monospace);
}
```

$\sum_{i=0}^{n-1} \sum_{j=0}^{i-1} |i + j|$

$$
\sum_{i=0}^{n-1} \sum_{j=0}^{i-1} |i + j|
$$

这是一个行内公式：$i$  
这是一个块级公式：

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

- 我是谁

- [链接: 开发笔记](../../01-开发笔记/index.md)

> 1
> > 2

**粗体** `定` *斜体*

ABC`中文`

# 不是哥们?!
# 为什么不能这样
## 1.

![alt text ##w100##](./PixPin_2025-04-13_23-21-43.png)

![alt text ##w75%##](PixPin_2025-04-13_23-21-43.png)

|图片|为什么|
|:-:|:-:|
|表格|不是居中|
|表格|不是居中|
|表格|不是居中|
|表格|不是居中|
|表格|不是居中|

- [x] 根本不对

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.