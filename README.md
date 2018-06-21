# :rocket: SSR

Super Simple Router.

一个灰常轻量化的前端路由框架.

* 无任何依赖, 轻至百行.
* 可随意搭配流行前端框架.
* 即开即用, 实现基础功能甚至无需写一行 js 代码.
* 支持 hook, 提供 location 参数匹配.

## 💾 Installation

直接

```JS
<script src='ssr.js'></script>
```

或者 NPM

```BASH
npm i @lqs469/ssr -S
```

## :feet: Usage

无障碍实现功能, 实现功能只在需要的路由的组件加了一个`path`. [这有一个简单的 Demo](https://github.com/lqs469/SSR/tree/master/demo)

HTML:

```html
<a href=''>Index</a>
<a href='#a'>A</a>
<a href='#b/3/4?test=1'>C</a>

<div path='/'>Index</div>
<div path='a'>A</div>
<div path='b/:i/:j'>C</div>
```

JS:

```js
// ES:
import ssr from '@lqs469/ssr'

// 跳转钩子
// 点击 <a href='#b/3/4?test=1'>C</a> 跳转之后触发:
ssr.didChange(['b/:i/:j'], (props, search) => {
  // path: { i: '3', j: '4' }
  // serach:{ test: '1' }
  ...
})
```

## TODO

* [x] npm
* [ ] 嵌套?
* [ ] regex?
* [ ] match method?
* [ ] action style?
* [ ] promise hook?
