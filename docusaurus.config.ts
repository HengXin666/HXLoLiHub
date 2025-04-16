import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkGithubAlerts from 'remark-github-alerts'; // Github tip标签渲染
import remarkMath from 'remark-math';   // 数学渲染
import rehypeKatex from 'rehype-katex'; // katex渲染

// 站点配置
const config: Config = {
  title: "HXLoLiHub", // 项目名称
  tagline: "妹宅知识管理系统！", // 项目的 tagline（副标题）
  favicon: "img/favicon.ico", // 项目图标，可以根据实际情况更换

  // 站点的URL，GitHub Pages 一般需要设置为项目的路径
  url: "https://HengXin666.github.io", // GitHub Pages 地址
  baseUrl: "/HXLoLiHub/", // 基础路径

  // GitHub Pages 部署配置, 修改为你的 GitHub 项目名称
  organizationName: "HengXin666", // GitHub 用户名或组织名
  projectName: "HXLoLiHub", // GitHub 项目名称

  onBrokenLinks: "warn", // 如果链接损坏则发出警告
  onBrokenMarkdownLinks: "warn", // Markdown 链接损坏警告

  // 国际化配置（如果是中文站点，可以将 locales 设置为 zh）
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
          editUrl: "https://github.com/HengXin666/HXLoLiHub/edit/main/", // 文档编辑链接，指向 GitHub 项目
          showLastUpdateTime: true, // 显示最后编辑时间
        },
        blog: {
          showReadingTime: true, // 显示博客阅读时间
          remarkPlugins: [remarkGithubAlerts, remarkMath],
          rehypePlugins: [rehypeKatex],
          feedOptions: {
            type: ["rss", "atom"], // 支持的博客订阅格式
            xslt: true,
          },
          editUrl: "https://github.com/HengXin666/HXLoLiHub/edit/main/", // 博客编辑链接，指向 GitHub 项目
          showLastUpdateTime: true, // 显示最后编辑时间
        },
        pages: {
          remarkPlugins: [remarkGithubAlerts, remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: true, // 显示最后编辑时间
        },
        theme: {
          customCss: "./src/css/custom.css", // 可以放置自定义的 CSS 样式
        },
      } satisfies Preset.Options,
    ],
  ],
  stylesheets: [
    // 数学公式所需样式
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig: {
    // 项目的社交卡片图像
    image: "img/docusaurus-social-card.jpg",
    navbar: {
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
      copyright: `Copyright © ${new Date().getFullYear()} HXLoLiHub, Inc. Built with Docusaurus.<br>本站所有作品均采用CC BY-NC-ND 4.0许可协议, 未经允许, 禁止用于商业用途, 转载需注明出处.`, // 页脚版权信息
    },
    prism: {
      theme: prismThemes.github, // 默认的代码高亮主题
      darkTheme: prismThemes.dracula, // 深色模式下的代码高亮主题
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
