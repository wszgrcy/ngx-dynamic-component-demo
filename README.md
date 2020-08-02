# 动态懒加载组件(表单控件)解决方案
## 这是什么
- 正常的使用,是先声明组件,然后在模板中引入组件,这就导致了一个问题,如果一个组件的使用次数非常少,那么这个模块仍然会把组件打包进去,使得模块增大
- 本项目先将组件当做正常标签写入,然后使用两个装饰器,一个为结构化懒加载指令,一个为自定义表单控件指令用来协助加载
## 需要前置知识
- [结构型指令](https://angular.cn/guide/structural-directives)
- [属性型指令](https://angular.cn/guide/attribute-directives)
- [自定义表达控件](https://segmentfault.com/a/1190000009070500)
- [ngModel实现原理](https://segmentfault.com/a/1190000019087763?_ea=10661501)
## 适用版本
- ng10(100%)
- ng9(接近100%)
> ng9和ng10没太大改动,所以ng9应该没什么问题

- ng8(如果不可以需要依赖路由实现)
- ng7以下(需要依赖路由实现)
> 与8的路由实现方式不同,但是总体是依赖路由实现的
## 效果
- 接近正常的开发只不过需要多个指令支持
- 只在使用时,会动态请求相关组件
- input完全相同
- output 会变成`CustomEvent`类型,值再`detail`属性中
- 表单控件在逻辑上应该完全一样
> 包括模板驱动式及响应式

## 思路
- 通过动态加载并创建的`web-component`元素,本质上与普通标签完全一样
- 所以说他就是个元素,无法响应双向绑定,需要通过指令来代替
> input,select等类型都是通过指令实现的双向绑定,这也是本次组件的实现思路
- 通过指令的中转,在需要懒加载的组件中加入一个**事件(componentIsLoaded)**,在初始化时发射事件,值为**这个组件的实例(this)**,通过拿到实例,将自定义表达控件相关的实现方法手动设置逻辑

## 代码地址
- [地址](https://github.com/wszgrcy/ngx-dynamic-component-demo)
- 此项技术过于吓人,所以在`stackblitz`无法查看到,如果想单纯在线看代码[点击这里](https://stackblitz.com/github/wszgrcy/ngx-dynamic-component-demo)
- [gh-pages查看效果](https://wszgrcy.github.io/ngx-dynamic-component-demo/)
## 使用
```ts
@NgModule({
  imports: [
    LazyLoadModule.forRoot([
      [
        'libwc',//lazyLoad结构型指令请求加载时传入的健名
        (injector, compiler) =>
          import('libwc').then((e) =>//准备加载哪个模块,这里是通过tsconfig指定的路径映射,也可以直接使用相对路径
            createWebComponent(//创建web-component组件,封装的便捷方法,module需要有属性entry赋值为需要创建的组件
              injector,
              compiler,
              e.LibwcModule,
              'custom-libwc'// 页面上要写标签名
            )
          ),
      ],
    ]),
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],//自定义元素
})
export class AppModule {}


```
```html
<!-- 这里使用的是非显示指令实现的的 -->
    <custom-libwc *lazyLoad="'libwc'" formControlName="lazy"></custom-libwc>
<!-- 和上面的等同,为显示指令 -->
      <custom-libwc  *lazyLoad="'libwc'" lazyLoadFormControl formControlName="lazy"></custom-libwc>
```