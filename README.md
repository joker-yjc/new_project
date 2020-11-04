# new_project

新项目框架模版

## 注意事项

1. .env 文件里面有系统注册名称需要修改成自己的应用名称

## 样式规范

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

index.vue 有一个全局的 loading，使用方法：

1.  路由注册过的页面
    开启 longing this.$emit('pageLoading',{status:true}) 
      关闭longing this.$emit('pageLoading')
2.  路由未注册的界面 使用 inject 进行注册 inject:['pageLoading'],然后直接调用方法，参数同上
