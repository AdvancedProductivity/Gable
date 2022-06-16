module.exports = {
    port: 3005,
    dest: '../docs',
    base: '/Gable/',
    lang: 'zh-CN',
    title: '你好， VuePress ！',
    description: 'An API platform for building and using APIs',
    locales: {
        '/': {
            lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
            title: 'Gable',
            description: 'An API platform for building and using APIs'
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'Gable',
            description: '一款类似Postman的Api协作工具'
        }
    },
    themeConfig: {
        lastUpdated: 'Last Updated',
        repo: 'https://github.com/AdvancedProductivity/Gable',
        docsDir: 'doc',
        sidebar: [
            {
                title: 'Group 1',   // 必要的
                path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    '/'
                ]
            },
            {
                title: 'Group 2',
                children: [ /* ... */ ],
                initialOpenGroupIndex: -1 // 可选的, 默认值是 0
            }
        ],
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                ariaLabel: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                algolia: {},
                nav: [
                    {text: 'Guide', link: '/Guide/', ariaLabel: 'Nested'}
                ]
            },
            '/zh/': {
                // 多语言下拉菜单的标题
                selectText: '选择语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                // 编辑链接文字
                editLinkText: '在 GitHub 上编辑此页',
                // Service Worker 的配置
                serviceWorker: {
                    updatePopup: {
                        message: "发现新内容可用.",
                        buttonText: "刷新"
                    }
                },
                // 当前 locale 的 algolia docsearch 选项
                algolia: {},
                nav: [
                    { text: '指南', link: '/zh/guide/' }
                ]
            }
        }
    }
}
