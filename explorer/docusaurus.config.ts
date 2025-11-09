import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import path from "path";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Rhiesearch",
  tagline: "탐구하고, 기록하고, 되돌아보는 제2의 뇌",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://research.rhiether.net",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "rhie-coder", // Usually your GitHub org/user name.
  projectName: "rhiesearch", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          // 기본 docs를 최소 설정으로 유지
          path: "docs", // 존재하지 않아도 괜찮음
          routeBasePath: "docs", // /docs 안 쓰더라도 기본 플러그인 존재
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // --- 📚 Knowledge
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "knowledge",
        path: "../knowledge", // 외부 경로
        routeBasePath: "knowledge",
        sidebarPath: require.resolve("./sidebars/knowledge.ts"),
        editUrl: "https://github.com/rhie-coder/rhiesearch/tree/main/knowledge",
      },
    ],

    // --- 🚄 Journal
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "journal",
        path: path.resolve(__dirname, "../journal"),
        routeBasePath: "journal",
        showReadingTime: true,
        blogSidebarCount: "ALL",
        sortPosts: "ascending",
        blogSidebarTitle: "All posts",
        onInlineTags: "warn",
        onInlineAuthors: "warn",
        onUntruncatedBlogPosts: "warn",
        feedOptions: {
          type: "all",
          title: "Rhiesearch",
          xslt: true,
          copyright: `Copyright © ${new Date().getFullYear()} RHIE-CODER`,
        },
      },
    ],
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "ko"], // 한국어 지원
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: "/knowledge",
        blogRouteBasePath: "/journal",
      },
    ],
  ],
  themeConfig: {
    blog: {
      sidebar: {
        groupByYear: false,
      },
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Rhiesearch",
      // hideOnScroll: true,
      logo: {
        alt: "Logo",
        src: "img/logo.svg",
      },
      items: [
        { to: "/journal", label: "🚀 Journal ", position: "left" },
        { to: "/knowledge", label: "📚 Knowledge", position: "left" },
        {
          href: "https://github.com/rhie-coder/rhiesearch",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      // style: "dark",
      links: [
        {
          title: "Tags",
          items: [
            {
              label: "Journal",
              to: "/journal/tags",
            },
            {
              label: "Knowledge",
              to: "/knowledge/tags",
            },
          ],
        },
      ],
      // copyright: `Copyright © ${new Date().getFullYear()} RHIE-CODER`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    themes: ['@docusaurus/theme-mermaid'],
    markdown: {
      mermaid: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
