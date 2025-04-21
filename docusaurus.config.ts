import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkGithubAlerts from 'remark-github-alerts'; // Github tip标签渲染
import remarkMath from 'remark-math';   // 数学渲染
import rehypeKatex from 'rehype-katex'; // katex渲染

// 站点配置
const config: Config = {
  title: "HXLoLiHub", // 项目名称
  tagline: "ここから先は一方通行だ!", // 项目的 tagline（副标题）
  favicon: "img/favicon.ico", // 项目图标, 可以根据实际情况更换

  // 站点的URL, GitHub Pages 一般需要设置为项目的路径
  url: "https://HengXin666.github.io", // GitHub Pages 地址
  baseUrl: "/HXLoLiHub", // 基础路径
  trailingSlash: false,

  // GitHub Pages 部署配置, 修改为你的 GitHub 项目名称
  organizationName: "HengXin666", // GitHub 用户名或组织名
  projectName: "HXLoLiHub", // GitHub 项目名称

  onBrokenLinks: "warn", // 如果链接损坏则发出警告
  onBrokenMarkdownLinks: "warn", // Markdown 链接损坏警告

  // 国际化配置
  i18n: {
    defaultLocale: "zh-Hans", // 默认语言为简体中文
    locales: ["zh-Hans"], // 只支持简体中文
  },

  plugins: [
    "plugin-image-zoom", // 图片单击放大
    "docusaurus-graph", // 文档关系图
  ],

  // 使用 presets 配置
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          include: ["**/*.{md,mdx}"],
          sidebarPath: "./sidebars.ts", // 引入自定义的侧边栏配置文件
          remarkPlugins: [remarkGithubAlerts, remarkMath],
          rehypePlugins: [rehypeKatex],
          editUrl: "https://github.com/HengXin666/HXLoLiHub/edit/main/", // 文档编辑链接, 指向 GitHub 项目
          showLastUpdateTime: true, // 显示最后编辑时间
          showLastUpdateAuthor: true,  // 显示更新作者
        },
        blog: {
          showReadingTime: true, // 显示博客阅读时间
          remarkPlugins: [remarkGithubAlerts, remarkMath],
          rehypePlugins: [rehypeKatex],
          feedOptions: {
            type: ["rss", "atom"], // 支持的博客订阅格式
            xslt: true,
          },
          editUrl: "https://github.com/HengXin666/HXLoLiHub/edit/main/", // 博客编辑链接, 指向 GitHub 项目
          showLastUpdateTime: true, // 显示最后编辑时间
          showLastUpdateAuthor: true,  // 显示更新作者
        },
        pages: {
          remarkPlugins: [remarkGithubAlerts, remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: true, // 显示最后编辑时间
          showLastUpdateAuthor: true,  // 显示更新作者
        },
        theme: {
          // 可以放置自定义的 CSS 样式
          customCss: [
            "./src/css/custom.css",
            "./static/katex/katex.css",
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // 评论设置
    giscus: {
      // 此处获取配置: https://giscus.app/zh-CN
      repo: 'HengXin666/HXLoLiHub',
      repoId: 'R_kgDOOY3jRQ',
      category: 'General',
      categoryId: 'DIC_kwDOOY3jRc4CpSQj',
      // 颜色主题
      theme: 'light_high_contrast',
      darkTheme: 'dark_tritanopia'
    },
    // 项目的社交卡片图像
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      hideOnScroll: true, // 自动隐藏导航栏
      title: "HXLoLiHub", // 导航栏标题
      logo: {
        alt: "HXLoLiHub Logo",
        src: "img/logo.png", // 站点的 logo 图片
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar", // 侧边栏ID
          position: "left",
          label: "文档", // 导航栏标签
        },
        {
          to: "/blog", // 跳转到博客页面
          label: "博客",
          position: "left",
        },
        {
          href: "https://github.com/HengXin666/HXLoLiHub", // 项目的 GitHub 地址
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark", // 页脚风格
      links: [
        {
          title: "帮助",
          items: [
            {
              label: "文档", // 帮助链接
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "社区",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/HengXin666/HXLoLiHub",
            },
            {
              label: "讨论",
              href: "https://discord.com/invite/docusaurus", // 可以替换为实际的讨论链接
            },
          ],
        },
      ],
      copyright: `版权所有 © ${new Date().getFullYear()} HXLoLiHub, Inc. 由 Docusaurus 构建.`, // 页脚版权信息
    },
    prism: {
      theme: prismThemes.oneDark,
      // 它必须在 node_modules/prismjs/components 中
      // 一般是 https://prismjs.com/#supported-languages 中的每一项的第一个
      // 如: Markup - markup, html, xml, svg, mathml, ssml, atom, rss
      // 它们都是 markup
      additionalLanguages: [
        // C++系列
        'cpp', 'cmake', 'makefile',
        // 前端系列
        'markup', 'css', 'javascript', 'typescript', 'scss', 'sass', 'qml', 'jsx', 'tsx',
        // 主流语言
        'java', 'go', 'python', 'kotlin', 'lua', 'php', 'rust', 'csharp', 'ruby',
        // 配置文件语言
        'docker', 'ini', 'json', 'yaml',
        // 其他
        'sql', 'powershell', 'bash', 'markdown',
      ],
    },
  } satisfies Preset.ThemeConfig,

  // 支持渲染 Mermaid 图表, 但是我们自己渲染! 以支持兼容组合代码块
  markdown: {
    mermaid: false,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
