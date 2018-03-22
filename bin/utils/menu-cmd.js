"use strict"
const _ = require('lodash');
const fs = require('fs');
const file = require('./file');
const remove = require('rimraf').sync;
const inquirer = require('inquirer');
const path = require('path');
//yml文件操作库,读取,解析
const yaml = require('js-yaml');
//文件夹操作库
const dir = require('node-dir');
const find = require('./collection').find;
// ***************文件路径声明***************
// 网站配置文件
const PATH_CONFIG_SITE = path.resolve(process.cwd(), './_config.yml')
// 网站配置对象
const CONFIG_SITE = yaml.safeLoad(fs.readFileSync(PATH_CONFIG_SITE, 'utf8'));

// 源文件文件夹目录
const PATH_SOURCE = path.resolve(process.cwd(), CONFIG_SITE.source_dir);
// 页面文件夹根目录
const PATH_PAGES = `${PATH_SOURCE}/pages`;

// menu文件夹目录
const PATH_CONFIG_MENU = path.resolve(process.cwd(), './source/_data/menu.yml');
// menu配置对象
const config_menu = yaml.safeLoad(fs.readFileSync(PATH_CONFIG_MENU, 'utf8')) || [];

//根据菜单数据生成文件夹
function generateDir(){
    _.each(config_menu,item=>{
        file.save.dir(`${PATH_PAGES}/${item.path}`)
        _.each(item.children,value=>{
            file.save.dir(`${PATH_PAGES}/${value.path}`)
        })
    })
};
module.exports = {
    //添加菜单
    add: (value,opt) => {
        const [name, title, parent, prev] = value.split(',');
        //检查新增菜单name是否已经存才
        const isExist = find.node(config_menu, 'name', name);
        //如果存在,退出
        if (isExist) {
            console.log('菜单名称已存在')
            process.exit(0);
        }
        //检查父级菜单是否存在
        let parentNode = parent === 'root' ? config_menu : find.node(config_menu, 'name', parent);
        if (!parentNode) {
            console.log('父级菜单不存在')
            process.exit(0);
        }
        //如果父级菜单为root,插入点为根目录数组,否则返回父级的children数组
        const brothers = parent === 'root' ? config_menu : parentNode.children;
        //查找上一个菜单是否存在
        const prevIndex = prev ? find.index(brothers, 'name', prev) : -1;
        if (prevIndex !== 0 && !prevIndex) {
            console.log('前一个菜单不存在')
            process.exit(0);
        }
        //插入菜单对象
        const mObj={
            name: name,
            title: title,
            path: parentNode.path ? `${parentNode.path}/${name}` : `/${name}`,
            children: [],
        }
        brothers.splice(prevIndex + 1, 0, mObj);
        //保存menu文件
        file.save.objToYaml(config_menu, PATH_CONFIG_MENU);
        if(opt.dir){
            file.save.dir(`${PATH_PAGES}/${mObj.path}`)
        }
    },
    //显示菜单
    list: () => {
        console.log(config_menu);
    },
    //删除某一菜单,同时会删除其所有子菜单
    del: (value,opt) => {
        const name = value;
        //检查新增菜单name是否存才
        const menu = find.node(config_menu, 'name', name);
        //如果不存在,退出
        if (!menu) {
            console.log('菜单不存在')
            process.exit(0);
        }
        //获取菜单所在数组
        const brothers = find.brothers(config_menu, 'name',name);
        //获取菜单索引
        const index = find.index(brothers, 'name', name);
        //请用户确认
        inquirer.prompt({
            name: 'confirmDel',
            message: '确认要删除菜单?',
            type: 'confirm',
            default: 'true'
        }).then(({confirmDel}) => {
            if(confirmDel){
                //删除菜单对象
                brothers.splice(index, 1);
                //保存menu文件
                file.save.objToYaml(config_menu, PATH_CONFIG_MENU);
                //删除文件夹
                if(opt.dir){
                    remove(`${PATH_PAGES}/${menu.path}`)
                }
            }
        })
    },
    //清空菜单
    clear: (opt) => {
        inquirer.prompt({
            name: 'confirmDel',
            message: '确认要清空菜单吗?',
            type: 'confirm',
            default: 'true'
        }).then(({confirmDel}) => {
            if(confirmDel){
                file.save.objToYaml([], PATH_CONFIG_MENU);
            }
            if(opt.dir){
                remove(PATH_PAGES);
                fs.mkdirSync(PATH_PAGES);
            }
        })
    },
    //根据菜单数据生成文件夹
    generate: () => {
        generateDir();
    },
}

exports.default = module.exports;


