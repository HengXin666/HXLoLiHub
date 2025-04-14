# 网站

这个网站是使用 [Docusaurus]（https://docusaurus.io/） 构建的，这是一个现代的静态网站生成器。

### 安装

```
$ 纱线
```

### 本地发展

```
$ 纱线开始
```

此命令将启动本地开发服务器并打开浏览器窗口。大多数更改都会实时反映出来，而无需重新启动服务器。

### 建造

```
$ yarn 构建
```

此命令将静态内容生成到 'build' 目录中，并且可以使用任何静态内容托管服务提供。

### 部署

使用 SSH：

```
$ USE_SSH=true yarn 部署
```

不使用 SSH：

```
$ GIT_USER=<您的 GitHub 用户名>yarn deploy
```

如果您使用 GitHub pages 进行托管，此命令是构建网站并推送到 gh-pages 分支的便捷方式。

### 依赖

- [代码块（CodeBlock）显示语言名称](https://jdocs.wiki/docusaurus-site/site-creation-guide/code-block-show-language-name)

- [添加Remark Github Alert插件](https://jdocs.wiki/docusaurus-site/plugins/plugins-remarkjs-github-alerts): [remark-github-alerts](https://github.com/hyoban/remark-github-alerts)

- [数学渲染 KaTeX](https://docusaurus.nodejs.cn/docs/markdown-features/math-equations)

- [图片单击放大](https://github.com/flexanalytics/plugin-image-zoom)
