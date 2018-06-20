# :rocket: SSR

Super Simple Router.

一个灰常轻量化的前端路由框架.

* 无任何依赖, 轻至百行.
* 可随意搭配流行前端框架.
* 即开即用, 实现基础功能甚至无需写一行 js 代码.
* 支持 hook, 提供 location 参数匹配.

## 💾 Installation

```
<script src='ssr.js'></script>
```

或者 NPM(TODO)

## :feet: Usage

```js
<a href=''>Index</a>
<a href='#a'>A</a>
<a href='#b'>B</a>
<a href='#c/3/4?test=1'>C</a>

<div path='/'>Index</div>
<div path='a'>A</div>
<div path='b'>B</div>
<div path='c/:i/:j'>C</div>
```

无障碍实现功能, 实现功能只在需要的路由的组件加了一个`path`

## TODO

* [ ] npm
* [ ] 嵌套?
* [ ] regex?
* [ ] match method?
* [ ] action style?
* [ ] promise hook?
