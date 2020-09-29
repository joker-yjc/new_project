# new_project

## Project setup

```
yarn/npm install
```

### Compiles and hot-reloads for development

```
yarn/npm run serve
```

### Compiles and minifies for production

```
yarn/npm run build
```

### Lints and fixes files

```
yarn/npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

#### 注意事项

1. .env 文件里面有系统注册名称需要修改成自己的应用名称

### 样式规范

- 面包屑

封装组件 breadNav

- 搜索部分

容器组件 filterContainer

搜索过滤组件容器 filterItem

- 主要内容部分

容器组件 mainBody

- 分页器

组件 pagination

- 全局 loading
  在 index.vue 新增一个全局的 loading，使用方法：
  1.  路由注册过的页面
      开启 longing this.$emit('pageLoading',{status:true}) 
      关闭longing this.$emit('pageLoading')
  2.  路由未注册的界面 使用 inject 进行注册 inject:['pageLoading'],然后直接调用方法，参数同上
