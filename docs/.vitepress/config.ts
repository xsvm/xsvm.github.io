import { defineConfig } from 'vitepress'
import markdownItKatex from '@iktakahiro/markdown-it-katex'

export default defineConfig({
  base: '/', // 主仓库使用根路径
  title: '我的博客',
  description: '使用VitePress搭建的个人博客',
  
  // Markdown 配置
  markdown: {
    config: (md) => {
      md.use(markdownItKatex, {
        throwOnError: false,  // 不抛出渲染错误
        errorColor: '#cc0000' // 错误显示为红色
      })
    }
  },

  // 添加 KaTeX CSS
  head: [
    ['link', { 
      rel: 'stylesheet', 
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
      crossorigin: 'anonymous'
    }]
  ],

  // 主题配置
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/articles/' },
      { text: '关于', link: '/about' }
    ],
    sidebar: {
      '/articles/': [
        {
          text: '文章列表',
          items: [
            { text: '开始使用', link: '/articles/getting-started' },
            { text: '01背包问题', link: '/articles/01背包问题' },
            { text: 'latex-demo', link: '/articles/latex-demo' },
            { text: '站点更新', link: '/articles/站点更新' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})