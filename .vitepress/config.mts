import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Gecko",
  description: "A React version of the control reversal dependency injection framework.",
  locales: {
    root: {
      label: "简体中文",
      lang: "zh"
    },
    en: {
      label: "English",
      lang: "en",
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.png",
    nav: [
      { text: '指南', link: '/guide/what-is-gecko' },
      { text: '参考', link: '/reference/route-configuration' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          collapsed: false,
          items: [
            { text: '什么是Gecko?', link: '/guide/what-is-gecko' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '什么是模块？', link: '/guide/create-module' }
          ]
        }
      ],
      '/reference/': [
        {
          text: '参考',
          items: [
            { text: '环境变量', link: '/reference/env' },
            { text: '模块', link: '/reference/module' },
            { text: '路由', link: '/reference/route' },
            { text: '国际化', link: '/reference/i18n' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/geckoai/gecko-doc' }
    ]
  }
})
