module.exports = {
    plugins: [
        [
            '@vuepress/google-analytics',
            {
                'ga': 'G-VPPB82K220'
            }
        ]
    ],
    port: 3005,
    base: '/GablePreview/docs/',
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
                sidebar: [
                    {
                        title: 'Guide',   // 必要的
                        collapsable: false, // 可选的, 默认值是 true,
                        sidebarDepth: 1,
                        children: [
                            '/guide/'
                            , '/guide/getting-started'
                            , '/guide/core-principles'
                            , '/guide/business-ideal'
                            , '/guide/feature-design'
                            , '/guide/document'
                            , '/guide/setting'
                            , '/guide/about'
                            , '/guide/making-friends'
                            , '/guide/database'
                            , '/guide/memory-assistant'
                        ]
                    }
                ],
                nav: [
                    {text: 'Guide', link: '/guide/', ariaLabel: 'Nested'},
                    { text: 'Live Demo', link: 'https://advancedproductivity.github.io/GablePreview/', target:'_blank' }
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
                sidebar: [
                    {
                        title: '指南',   // 必要的
                        collapsable: false, // 可选的, 默认值是 true,
                        sidebarDepth: 1,
                        children: [
                            '/zh/guide/'
                            , '/zh/guide/getting-started'
                            , '/zh/guide/core-principles'
                            , '/zh/guide/business-ideal'
                            , '/zh/guide/feature-design'
                            , '/zh/guide/document'
                            , '/zh/guide/setting'
                            , '/zh/guide/about'
                            , '/zh/guide/making-friends'
                            , '/zh/guide/database'
                            , '/zh/guide/memory-assistant'
                        ]
                    }
                ],
                nav: [
                    {text: '指南', link: '/zh/guide/', ariaLabel: 'Nested'},
                    { text: '在线体验', link: 'https://advancedproductivity.github.io/GablePreview/', target:'_blank' }
                ]
            }
        }
    }
};
