---
outline: deep
---

# 快速开始

## 安装

### 准备
- [Node.js](https://nodejs.org/)及以上版本
- 通过命令行界面使用 `gecko-cli` 终端

```shell
npm i -g @geckoai/gecko-cli
```

### 安装向导 

```shell
gecok create <app-name>
cd <app-name>
pnpm install
```

需要交互几个简单问题：

```md
 ┌ Download template success!
 │
 ◇ Please enter project description!
 | description
 │
 ◇ Please enter project author!
 | mingqi-tech
 │
 ◇ Please enter project productName!
 | App Name
 │
 ◇ Please enter project appId
 | com.mininglamp.electron.app
 │
 ◇ Please enter project copyright!
 | Copyright © 2020 mininglamp
 │
 ◇ Is install dependencies?
 | n
 │
 └  To get started.
```

## 文件结构

```md
|-  project                                     项目名称
|    |-  public                                 组件入口
|    |    |-  index.html
|    |    |-  robots.txt
|    |    |-  logo.png
|    |-  src                                    开发工作目录
|    |    |-  main                              Platform for Electron
|    |    |    |-  index.ts                     Electron进程 (如果只开发Web则无需理会)
|    |    |    |-  util.ts                      常用方法
|    |    |-  renderer                          Platform for Web
|    |    |    |-  application.tsx              应用
|    |    |    |-  application.less             应用样式
|    |    |    |-  fallback.tsx                 Suspense的fallback
|    |    |    |-  index.tsx                    应用入口
|    |    |    |-  root.tsx                     根元素
|    |-  .babelrc                               babel配置文件
|    |-  .env                                   环境变量配置
|    |-  .env.local.md                          环境变量配置(删除.md后缀后当作本地配置) 优先级高于(.env.production|.env.development)
|    |-  .env.development                       开发环境变量配置 优先级高于(.env)
|    |-  .env.production                        生产环境变量配置 优先级高于(.env)
|    |-   eslint.config.mjs                     eslint配置
|    |-  .gitignore                             git配置
|    |-  .npmrc                                 npm配置 支持pnpm
|    |-  crowdin.yaml                           多语言平台配置
|    |-  project.config.js                      项目配置
|    |-  pnpm-workspace.yaml                    pnpm工作空间配置
|    |-  README.md                              项目描述
|    |-  tsconfig.json                          ts配置文件
|    |-  package.json                           
```

## 配置文件

`project.config.js` 用于配置项目的运行配置, 配置是基于的`webpack`。

```js
const path = require('path');
const URI = process.env.API_URL;
// const px2rem = require('postcss-pxtorem');

module.exports = {
    renderer: {
        /**
         * webpack config options
         * see: https://webpack.js.org/configuration/
         */
        webpack: {},
        /**
         * style configs
         */
        style: {
            /**
             * css-loader options
             * see: https://webpack.js.org/loaders/css-loader#options
             */
            css: {},
            /**
             * less-loader options
             * see: https://webpack.js.org/loaders/less-loader#options
             */
            less: {
                lessOptions: {
                    modifyVars: {
                        '@primary-color': '#38A28A',
                    },
                    javascriptEnabled: true,
                },
            },
            /**
             * sass-loader options
             * see: https://webpack.js.org/loaders/sass-loader/#options
             */
            sass: {},
            /**
             * postcss-loader options
             * https://webpack.js.org/loaders/postcss-loader/#options
             */
            postcss: {
                postcssOptions: {
                    // rem 方案代码
                    // plugins: [
                    //   px2rem({
                    //     rootValue: 12,
                    //     unitPrecision: 5,
                    //     propList: ['*'],
                    //     selectorBlackList: [],
                    //     replace: true,
                    //     mediaQuery: false,
                    //     minPixelValue: 0,
                    //   })
                    // ]
                },
            },
            /**
             * StylelintWebpackPlugin options
             * see: https://webpack.js.org/plugins/stylelint-webpack-plugin/#options
             */
            lint: null,
        },
        /**
         * babel-loader options
         * see: https://webpack.js.org/loaders/babel-loader/#options
         */
        babel: {},
        /**
         * file-loader options
         * see: https://github.com/webpack-contrib/file-loader
         */
        file: {},
        /**
         * EslintWebpackPlugin options
         * see: https://webpack.js.org/plugins/eslint-webpack-plugin/#options
         */
        eslint: {},
        // DevServer see: https://webpack.js.org/configuration/dev-server
        devServer: {
            compress: true,
            proxy: {
                '/api': {
                    target: URI,
                    changeOrigin: true,
                },
            },
        },
        alias: {},
        // CDN配置
        deployOptions: {
            packages: {
                validator: {
                  scripts: {
                    variableName: 'validator',
                    path: 'validator.min.js',
                    cdnPath: 'validator.min.js',
                  },
                },
                "echarts": {
                  scripts: {
                    variableName: 'echarts',
                    path: IS_PROD ? 'echarts.min.js' : 'echarts.js',
                    cdnPath: IS_PROD ? 'dist/echarts.min.js' : 'dist/echarts.js',
                  }
                },
            },
            useCdn: true,
            getCdnPath: (n, v, p) => `https://unpkg.com/${n}@${v}/${p}`,
        },
    },
    main: {
        webpack: {},
        /**
         * ts-loader options
         * see: https://github.com/TypeStrong/ts-loader
         */
        babel: {},
        alias: {},
    },
    alias: {
        '@packages': path.resolve('packages'),
    },
};

```


## 启动运行
工具通过npm脚本注入到了`package.json`中:
```md [package.json]
{
  ...
  "scripts": {
    "start": "gecko start",
    "swagger": "gecko swagger-generator",
    "build": "gecko build && electron-builder",
    "electron-builder": "electron-builder",
    "postinstall": "electron-builder install-app-deps",
    "crowdin:upload": "crowdin upload sources --auto-update --config ./crowdin.yaml",
    "crowdin:download": "crowdin download --verbose --config ./crowdin.yaml"
  },
  ...
}
```

`start` 脚本将启动具有即时热更新的本地开发服务器。使用以下命令运行它：
```shell
pnpm run start
```