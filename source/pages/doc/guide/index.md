---
title: 介绍
type: guide
order: 2
---

doc-common用来构建文档的通用模板,基于hexo,使用前请先全局安装hexo-cli

[安装教程](/pages/doc/guide/install.html)给出具体的安装过程

## 初始化项目

<p class="tip">假设此时你已按照`安装教程`完成安装</p>

### 创建项目文件夹
```
$ mkdir project 
```
### 切换到目录文件夹内
```
$ cd project 
```
### 加载项目模板
```
$ tydic init doc-common
```
### 安装依赖
 <p class="tip">推荐使用<b>cnpm</b>淘宝镜像安装,安装cnpm方式<b>npm i cnpm -g</b></p>
 
```
$ npm install 
```
### 启动项目
```
$ npm start
```
## 修改菜单

### 修改顶部菜单

`source/_data/menu.yml`

```yml
#目前只支持两级菜单
#name  对应文件名称
#title 中文名称
#path  相对于pages的路径
- name: doc
  title: 文档
  path: /doc
  children:
    - name: guide
      title: 教程
      path: /doc/guide
      children: []
```
### 修改左侧菜单分组

`themes/vue/layout/partials/toc.ejs`

根据不同的md文件名`fileName`划分不同的分组

```html
<!--fileName对应文件名-->
<% if (fileName === 'installation') { %>
        <li><h3>基础</h3></li>
      <% } %>
      <% if (fileName === 'transitions') { %>
        <li><h3>过渡 & 动画</h3></li>
      <% } %>
      <% if (fileName === 'mixins') { %>
        <li><h3>可复用性 & 组合</h3></li>
      <% } %>
      <% if (fileName === 'deployment') { %>
        <li><h3>工具</h3></li>
      <% } %>
      <% if (fileName === 'routing') { %>
        <li><h3>规模化</h3></li>
      <% } %>
      <% if (fileName === 'reactivity') { %>
        <li><h3>内在</h3></li>
      <% } %>
      <% if (fileName === 'migration') { %>
        <li><h3>迁移</h3></li>
      <% } %>
      <% if (fileName === 'comparison') { %>
        <li><h3>更多</h3></li>
```

## 添加文件

文件只能创建在二级目录文件夹内,文件格式如下:

`title`会作为 文章标题/目录名称/和页面title
`type` 保持guide不变
`order`排序,数值大小决定在左侧目录列表出现的位置,数字越小越靠前 

```html
---
title: 安装   
type: guide
order: 1
---
```
