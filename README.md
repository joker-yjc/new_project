# new_project

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### 注意事项

1. 页面布局可以用 flex，不兼容 IE，但是注意兼容小屏幕，如笔记本。
2. 面包屑应正确反映页面层次，可点击的面包屑应有蓝色标识，鼠标放上去有手形。
3. 关键错误应有捕获和异常上报。
4. 搜索需要把搜索条件放进 url,这样返回的时候就可以拿到原来的搜索条件。
5. 如果取消按钮和其他主要按钮放一起，那么取消按钮在左边，其他按钮在右边
6. `projectConfig.js`里面有系统注册名称需要修改成自己的应用名称

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
