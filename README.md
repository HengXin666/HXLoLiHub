# 网站

这个网站是使用 [Docusaurus]（https://docusaurus.io/） 构建的，这是一个现代的静态网站生成器。



### 依赖

- [代码块(CodeBlock)显示语言名称](https://jdocs.wiki/docusaurus-site/site-creation-guide/code-block-show-language-name)
    - 并且基于此, 二次开发, 添加了 [monaco-editor](https://github.com/microsoft/monaco-editor), 让一些代码块可编辑.
    - 并且添加了 [OneDark-Pro](https://github.com/Binaryify/OneDark-Pro) 主题
    - 特别的, 该组件为客户端渲染!
    - @todo: 应该学习[主题升级](https://www.cnblogs.com/wanglinmantan/p/15345204.html), 使其更加贴切vscode! (好难, 没时间, 暂时不搞了)

- [添加Remark Github Alert插件](https://jdocs.wiki/docusaurus-site/plugins/plugins-remarkjs-github-alerts)
    - 基于[remark-github-alerts](https://github.com/hyoban/remark-github-alerts)

- [数学渲染 KaTeX](https://docusaurus.nodejs.cn/docs/markdown-features/math-equations)
    - 原项目与依赖样式: [KaTeX](https://github.com/KaTeX/KaTeX)

- [图片单击放大](https://github.com/flexanalytics/plugin-image-zoom)

- [文档关系图](https://github.com/Arsero/docusaurus-graph)

- [支持评论: 基于giscus](https://giscus.app/zh-CN) 依赖 [@giscus/react](https://www.npmjs.com/package/@giscus/react), 感谢 [用 Giscus 给 Docusaurus 博客增加评论区](https://zhuanlan.zhihu.com/p/717218474)、[Docusaurus 添加评论功能](https://www.alanwang.site/posts/blog-guides/docusaurus-comment) 的文章教学!

- 使用了[vscode-icons](https://github.com/vscode-icons/vscode-icons)的`文件夹`和`markdown`图标

> [!TIP]
> giscus 本系统是基于`url`映射的, 请注意, 一旦定下文件名, 就不能调整了 (虽然title也是这样的...)