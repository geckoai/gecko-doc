---
outline: deep
---

# 模块配置

在 `Gecko`中，一个模块由多个文件组成，可以包含子模块.

```ts
import { Module } from "@gecko/gecko-core";

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class DemoModule {}
```

## imports
`imports` 可以用于导入其他模块，导入模块能把被导入的模块运行起来，并且可以将被导入模块 `providers` 提供的并 `exports` 的 Service 导入到当前模块中使用。

::: code-group

```ts [user-module.ts]
import { Module } from "@gecko/gecko-core";

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class UserModule {}
```

```ts [sign-module.ts]
import { Module } from "@gecko/gecko-core";

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class SignModule {}
```

```ts [app-module.ts]
import {Module} from "@gecko/gecko-core";
import {UserModule} from "./user-module";
import {SignModule} from "./sign-module";

@Module({
  imports: [UserModule, SignModule],
  providers: [],
  exports: [],
})
export class AppModule {}

Bootstrap.run(AppModule);
```
:::

此时App模块开始运行 并且 UserModule和SignModule也会运行。
可以在各模块中添加构造函数 `constructor` 打印日志测试。
要注意运行顺序，运行时机时 被导入的模块比导入的模块优先被创建。

## providers
`providers` 用于为当前模块提供服务，服务会由 `di` 系统自动创建 或者以工厂等模式创建。

::: code-group
```ts [app-service.ts]
import {injectable} from "@gecko/gecko-core"; 

@injectable()
export class AppService {
  public timestamp = Date.now();
} 
``` 

```ts [app-module.ts]
import {Module} from "@gecko/gecko-core";
import {AppService} from "./app-service";

@Module({
  providers: [AppService],
})
export class AppModule {
  constructor(service: AppService) {
    console.log(service.timestamp); // 输入时间戳
  }
}

Bootstrap.run(AppModule);
``` 
:::

`AppService` 是怎么被创建的？当 `Bootstrap.run(AppModule);` 运行时，会发现从装饰器中查询 `AppModule` 装饰的元数据，
从元数据中得知 `AppModule` 有一个构造函数 且有一个参数名叫`service`的参数，类型为 `AppService`, di 系统会从当前模块中查找 `AppService`，
也就是 ` providers: [AppService]` 中的数据，如果有且没有创建过就会自动实例化一个 `AppService`的实例 提供给`AppModule`用于`AppModule`的实例化 .

如果`AppModule`的构造函数中出现了，` providers: [AppService],` 没有的参数，此时就会出现异常报错提示。

若要想知道 `di` 系统时如何得知`AppModule`类里构造函数中的参数和装饰器信息的，可以参阅 Typescript 的装饰器原理。