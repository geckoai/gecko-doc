---
outline: deep
---

# 创建模块

在项目 `src/renderer` 中可以在任意目录子目录中创建模块，`Gecko`是按模块的方式运行, 建议一个模块一个目录。

建议的目录基础目录结构：
```md

|-  renderer                    Platform for Web
|   |-  sign                    登录模块目录                            
|   |   |-  index.ts            入口文件
|   |   |-  component.tsx       模块路由的渲染组件  
|   |   |-  locales             语言包目录
|   |   |   |-  zh-CN.json      中文语言包
|   |   |   |-  en.json         英文语言包
```

在`src/renderer/sign`目录中，创建以下示例文件：

::: code-group

```ts [index.ts]
import { Fallback, Route, RouteModuleLifeCycle } from '@geckoai/platform-react';
import { Component } from './component';
import { locales } from './locales';
import { I18nMap, I18nReact } from '@geckoai/i18n-react';
import { Module } from '@geckoai/gecko-core';
import { Skeleton } from './skeleton';
import {locales} from './locales';

@Route({
  index: 'sign.html',
  Component,
})
@I18nMap(locales)
@Fallback(Skeleton)
@Module({ imports: [I18nReact] })
export class SignModule {}
```

```tsx [component.tsx]
// react 热更新推荐使用带有名称的函数而不是匿名函数，有助于热更新更精准的在开发时刷新页面
export function Component() {
  const service = useService<I18nGlobalService>(I18nGlobalService);
  const i18n = useI18n<I18nLocale>();
  return (
    <div>
      {i18n?.Home}
      <div>
        <button type="button" onClick={() => service.current.next('zh-CN')}>
          中文
        </button>
        <button type="button" onClick={() => service.current.next('en')}>
          English
        </button>
      </div>
    </div>
  )
}
```

```ts [locales/index.ts]
import zh from './locales/zh-CN.json'
import en from './locales/en.json'

// 1. 使用本地JSON配置
export const locales: I18nLazyDoc[] = [
  {
    // Language key of browser `window.navigator.language`
    // Please follow the browser language settings
    lang: 'zh-CN',
    locale: zh,
  },
  {
    // Language key of browser `window.navigator.language`
    // Please follow the browser language settings
    lang: 'en',
    locale: en,
  },
];

// 2. 从服务器加载静态JSON文件
// export const locales = [
//   {
//     // Language key of browser `window.navigator.language`
//     // Please follow the browser language settings
//     lang: 'zh-CN',
//     locale: I18nReact.loader('https://www.your-host.com/locales/zh-CN.json'),
//   },
//   {
//     // Language key of browser `window.navigator.language`
//     // Please follow the browser language settings
//     lang: 'en',
//     locale: I18nReact.loader('https://www.your-host.com/locales/zh-CN.json'),
//   }
// ]
```

```json [locales/zh-CN.json]
{
  "Home": "首页",
  "User": "用户"
}
```

```json [locales/en.json]
{
  "Home": "Home",
  "User": "User"
}
```
:::

## 装饰器说明

### 装饰器 @Module
`@Module` 装饰器在 `@geckoai/gecko-core` 模块中，用于程序在启动时解析出所有模块，以及控制反转和注入依赖。
在Gecko中所有模块都应加上 `@Module` 装饰器。
`@Module` 装饰器有2种重载方法

```ts
export declare function Module<TFunction extends Function>(target: TFunction): TFunction | void;
export declare function Module(metadata: Partial<GeckoModuleIml>, scope?: BindingScope): ClassDecorator;
```

1. 模块不包含任何的 `providers`、`exports`、`imports`:
```ts
@Module
export class DemoModule {}
```

2. 模块包含`providers`、`exports`、`imports` 其中任意:

```ts
@Module({
  // 模块提供了一个 TestService
  providers: [TestService]
})
export class DemoModule {}
```


### 装饰器 @BrowserRouter

在项目的模板中可以看到有 `@BrowserRouter` 装饰器的使用，此装饰器的作用用于描述当前应用的react-router使用什么模式，
从 `@geckoai/platform-react` 导入
参考: 
- [BrowserRouter](https://reactrouter.remix.org.cn/api/declarative-routers/BrowserRouter)
- [HashRouter](https://reactrouter.remix.org.cn/api/declarative-routers/HashRouter)
- [MemoryRouter](https://reactrouter.remix.org.cn/api/declarative-routers/MemoryRouter) 


```tsx
import {
  BrowserRouter,
  ReactRouter,
  RouterService,
} from '@geckoai/platform-react';

@BrowserRouter
@Module({
  imports: [HomeModule],
  providers: [
    RouterService,
    // Language key of browser `window.navigator.language`
    // Please follow the browser language settings
    I18nGlobalService.for('zh-CN', Fallback),
    ReactRouter.ProvideFallback(Fallback),
  ],
})
export class Application {
  constructor(container: Container, service: RouterService) {
    const root = document.getElementById('root');
    if (root) {
      ReactDOM.createRoot(root).render(
        <Root container={container} router={service.getRouter()} />,
    );
    }
  }
}

```

### 装饰器 @Route

`@Route` 装饰器中的参数为 react-router的参考结构： [RouteObject](https://reactrouter.remix.org.cn/api/components/Route)

```ts
import { Route } from '@geckoai/platform-react';

@Route({
  index: 'sign.html',
  Component,
})
export class SignModule {}
```

### 装饰器 @I18nMap

`@I18nMap` 用于装饰i18n语言包的元数据

```ts
import { Route } from '@geckoai/platform-react';

@I18nMap(locales) 
export class SignModule {}
```

### 装饰器 @Fallback

`@Fallback` 用于装饰 当前页面  React.Suspense 中 `fallback`的组件

```ts
import { Route } from '@geckoai/platform-react';

@Fallback(FallbackComponent) 
export class SignModule {}
```

### 装饰器 @ErrorBoundary

`@Fallback` 用于装饰 当前页面在异常崩溃时使用的组件

```ts
import { Route } from '@geckoai/platform-react';

@ErrorBoundary(ErrorBoundaryComponent) 
export class SignModule {}
```