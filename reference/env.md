---
outline: deep
---

# 环境变量

`Gecko`的环境变量由以下几个配置文件组成：

文件的优先级别 

- .env.local > .env.production > .env
- .env.local > .env.development > .env

::: code-group

```shell [.env]
# 默认环境变量

# 开发时的 host
HOST=127.0.0.1

# 开发用的 端口
PORT=3013

# webpack编译时的 PUBLIC_URL
PUBLIC_URL=/ #建议 electron时使用相对路径

#运行模式 为electron模式
#APP_RUNTIME_ENV=electron 

#运行模式 为web模式
APP_RUNTIME_ENV=web 

# 开发用的 参数自定义
API_URL=http://www.geckoai.cn
# WDS_SOCKET_HOST=0.0.0.0
# WDS_SOCKET_PORT=3012
# WDS_SOCKET_PATH=/ws
# MAX_OLD_SPACE_SIZE='4096'
```

```md [.env.development]
# 开发时环境变量

```

```md [.env.production]
# 生产后环境变量

```

```md [.env.local]
# 本地环境变量用于调试


```
:::

若自定义的环境变量 在编辑器中没有代码提示，可以在项目根目录 `react-app-env.d.ts` 中编辑。

```ts
namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PUBLIC_URL: string;
    WDS_SOCKET_HOST: string;
    WDS_SOCKET_PORT: string;
    WDS_SOCKET_PATH: string;
    APP_RUNTIME_ENV:  'web' | 'electron';
    MAX_OLD_SPACE_SIZE: string;
    
    // 下面的自定义
    API_URL: string;
    RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: boolean
  }
}

// 这样可以在process中使用
process.env.API_URL
```