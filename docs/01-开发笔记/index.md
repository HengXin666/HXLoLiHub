# 开发笔记

```cpp
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

```typescript [组1-ts]
// 上一个页面
function MakeSimpleCodeBlock (
    props: Props & { fkPrefixLanguage: string }
) {}
```

```js [组2-js]
// 上一个页面
function MakeSimpleCodeBlock (
    props: Props & { fkPrefixLanguage: string }
) {}
```

```js [组1-js]
// 上一个页面
function MakeSimpleCodeBlock (
    props: Props & { fkPrefixLanguage: string }
) {}
```

```ts [组2-ts]
// 上一个页面
function MakeSimpleCodeBlock (
    props: Props & { fkPrefixLanguage: string }
) {}
```

> [!TIP]
> 这个是TIP