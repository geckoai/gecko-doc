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
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '什么是Gecko?', link: '/guide/what-is-gecko' },
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '创建模块', link: '/guide/create-module' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/geckoai/gecko-doc' }
    ]
  }
})
