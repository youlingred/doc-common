#!/usr/bin/env bash
const program=require('commander');
const menu = require('./utils/menu-cmd.js');
program
    .version('0.1.0')
    .usage('<command> <args> [options]')
//添加菜单
program
    .command('add <name,title,parent,prev>')
    .description('添加菜单\n' +
        '\033[35m\t\t\t\t\t\t\b\b\b\bname:菜单英文表示用于生n成文件夹必须唯一\n' +
        '\t\t\t\t\t\t\b\b\b\btitle:菜单中文名称\n' +
        '\t\t\t\t\t\t\b\b\b\bparent:父级菜单name,如果root则添加到一级根目录\n' +
        '\t\t\t\t\t\t\b\b\b\bprev:同级菜单中的前一个菜单name,如果参数为空默认插入到第首位\033[0m')
    .option('-d --dir', '同时生成目录文件夹')
    .action((argv, options)=>{
       menu.add(argv,options)
    });
//删除菜单
program
    .command('del <name>')
    .description('删除菜单\n' +
        '\033[35m\t\t\t\t\t\t\b\b\b\bname:菜单名称\033[0m')
    .option('-d --dir', '同时删除目录文件夹')
    .action((argv, options)=>{
        menu.del(argv,options)
    });
//显示菜单列表
program
    .command('list')
    .description('显示菜单列表')
    .action(()=>{
        menu.list()
    });
//清空菜单
program
    .command('clear')
    .description('清空菜单\n' +
        '\033[35m\t\t\t\t\t\t\b\b\b\bname:菜单名称\033[0m')
    .option('-d --dir', '同时清空文件夹')
    .action((options)=>{
        menu.clear(options)
    });
//生成文件夹
program.option('-g --generate', '生成文件夹',menu.generate)
program
    .command('generate')
    .description('生成文件夹')
    .action(()=>{
        menu.generate()
    });
program.parse(process.argv);
